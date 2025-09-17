# GreenLoop Project - Backend Integration Contracts

## Overview
This document outlines the API contracts and backend integration plan for the GreenLoop Project landing page.

## Current Mock Data
The frontend currently uses mock data from `/app/frontend/src/components/mock.js` for:
- Project information (name, mission, etc.)
- Product details (seed paper, upcycled pouches)  
- Contact form data
- Navigation and static content

## Backend Implementation Plan

### 1. Contact Form API
**Endpoint:** `POST /api/contact`

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required, email format)",
  "organization": "string (optional)",
  "interest": "string (optional, from predefined list)",
  "message": "string (required)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "id": "submission_id"
}
```

**Validation Rules:**
- Name: minimum 2 characters, maximum 100 characters
- Email: valid email format
- Organization: maximum 100 characters
- Interest: one of ["Learning about products", "Partnership opportunities", "Joining the community", "Research collaboration", "Bulk orders", "Other"]
- Message: minimum 10 characters, maximum 1000 characters

### 2. Database Models

#### ContactSubmission Model
```python
class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    organization: Optional[str] = None
    interest: Optional[str] = None
    message: str
    submitted_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "new"  # new, reviewed, responded
```

### 3. Frontend Integration Changes

#### Contact Form Component
- Remove mock form submission
- Integrate with real POST /api/contact endpoint
- Add proper error handling and loading states
- Show success/error messages based on API response

#### Static Data
- Keep project information, products, and navigation in mock.js (static content)
- Only integrate dynamic form submission with backend

### 4. API Error Handling

**Error Response Format:**
```json
{
  "success": false,
  "message": "Error description",
  "errors": {
    "field_name": ["Error message"]
  }
}
```

**HTTP Status Codes:**
- 200: Success
- 400: Bad Request (validation errors)
- 500: Internal Server Error

### 5. Backend Features to Implement

1. **Contact Form Endpoint**
   - Validate input data
   - Save to MongoDB
   - Send confirmation (optional)
   - Return success response

2. **Contact Submissions Management** (Optional)
   - GET /api/contact - List all submissions (admin only)
   - GET /api/contact/{id} - Get specific submission
   - PATCH /api/contact/{id} - Update submission status

3. **Basic Error Handling**
   - Input validation
   - Database connection errors
   - Proper HTTP status codes

### 6. Integration Steps

1. Implement ContactSubmission model in backend
2. Create POST /api/contact endpoint
3. Update frontend Contact component to use real API
4. Test form submission flow
5. Add error handling and loading states
6. Remove mock form logic from frontend

### 7. Optional Enhancements (Future)

- Email notifications on form submission
- Admin dashboard for managing submissions
- Product inquiry tracking
- Analytics on form submissions

## Notes
- Keep static content (project info, products) in mock.js for easy content management
- Focus on making contact form fully functional
- Ensure proper validation and error handling
- Maintain responsive design and user experience