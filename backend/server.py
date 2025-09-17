from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, validator
from typing import List, Optional
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="GreenLoop Project API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactSubmissionCreate(BaseModel):
    name: str
    email: EmailStr
    organization: Optional[str] = None
    interest: Optional[str] = None
    message: str

    @validator('name')
    def validate_name(cls, v):
        if len(v.strip()) < 2:
            raise ValueError('Name must be at least 2 characters long')
        if len(v.strip()) > 100:
            raise ValueError('Name must be less than 100 characters')
        return v.strip()

    @validator('organization')
    def validate_organization(cls, v):
        if v and len(v.strip()) > 100:
            raise ValueError('Organization must be less than 100 characters')
        return v.strip() if v else None

    @validator('interest')
    def validate_interest(cls, v):
        if v:
            valid_interests = [
                "Learning about products",
                "Partnership opportunities", 
                "Joining the community",
                "Research collaboration",
                "Bulk orders",
                "Other"
            ]
            if v not in valid_interests:
                raise ValueError(f'Interest must be one of: {", ".join(valid_interests)}')
        return v

    @validator('message')
    def validate_message(cls, v):
        if len(v.strip()) < 10:
            raise ValueError('Message must be at least 10 characters long')
        if len(v.strip()) > 1000:
            raise ValueError('Message must be less than 1000 characters')
        return v.strip()

class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    organization: Optional[str] = None
    interest: Optional[str] = None
    message: str
    submitted_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "new"

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "GreenLoop Project API is running"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.post("/contact")
async def submit_contact_form(contact_data: ContactSubmissionCreate):
    try:
        # Create contact submission object
        submission = ContactSubmission(**contact_data.dict())
        
        # Save to database
        result = await db.contact_submissions.insert_one(submission.dict())
        
        if result.inserted_id:
            return JSONResponse(
                status_code=200,
                content={
                    "success": True,
                    "message": "Thank you for your message! We'll get back to you soon.",
                    "id": submission.id
                }
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to save submission")
            
    except ValueError as e:
        return JSONResponse(
            status_code=400,
            content={
                "success": False,
                "message": "Please check your input and try again.",
                "errors": {"validation": [str(e)]}
            }
        )
    except Exception as e:
        logging.error(f"Contact form submission error: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "message": "An error occurred while processing your request. Please try again later."
            }
        )

@api_router.get("/contact", response_model=List[ContactSubmission])
async def get_contact_submissions():
    """Get all contact submissions (for admin use)"""
    try:
        submissions = await db.contact_submissions.find().sort("submitted_at", -1).to_list(100)
        return [ContactSubmission(**submission) for submission in submissions]
    except Exception as e:
        logging.error(f"Error fetching contact submissions: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch submissions")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
