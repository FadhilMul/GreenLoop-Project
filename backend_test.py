#!/usr/bin/env python3
"""
GreenLoop Project Backend API Test Suite
Tests the contact form functionality and API endpoints
"""

import requests
import json
import time
from datetime import datetime
import uuid

# Configuration
BASE_URL = "https://eco-pouch-project.preview.emergentagent.com/api"
TIMEOUT = 30

class BackendTester:
    def __init__(self):
        self.test_results = []
        self.failed_tests = []
        self.passed_tests = []
        
    def log_test(self, test_name, passed, message="", response_data=None):
        """Log test results"""
        result = {
            "test": test_name,
            "passed": passed,
            "message": message,
            "timestamp": datetime.now().isoformat(),
            "response_data": response_data
        }
        self.test_results.append(result)
        
        if passed:
            self.passed_tests.append(test_name)
            print(f"✅ {test_name}: {message}")
        else:
            self.failed_tests.append(test_name)
            print(f"❌ {test_name}: {message}")
            if response_data:
                print(f"   Response: {response_data}")
    
    def test_api_health_check(self):
        """Test GET /api/ endpoint"""
        try:
            response = requests.get(f"{BASE_URL}/", timeout=TIMEOUT)
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "GreenLoop" in data["message"]:
                    self.log_test("API Health Check", True, f"API is running - {data['message']}")
                else:
                    self.log_test("API Health Check", False, f"Unexpected response format", data)
            else:
                self.log_test("API Health Check", False, f"HTTP {response.status_code}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("API Health Check", False, f"Connection error: {str(e)}")
    
    def test_valid_contact_form_all_fields(self):
        """Test valid contact form submission with all fields"""
        contact_data = {
            "name": "Sarah Johnson",
            "email": "sarah.johnson@greentech.com",
            "organization": "GreenTech Solutions",
            "interest": "Partnership opportunities",
            "message": "I'm interested in exploring partnership opportunities for sustainable packaging solutions. Our company specializes in eco-friendly products and we'd love to discuss potential collaboration."
        }
        
        try:
            response = requests.post(f"{BASE_URL}/contact", json=contact_data, timeout=TIMEOUT)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "id" in data:
                    self.log_test("Valid Contact Form (All Fields)", True, f"Form submitted successfully with ID: {data['id']}")
                else:
                    self.log_test("Valid Contact Form (All Fields)", False, "Success flag missing or no ID returned", data)
            else:
                self.log_test("Valid Contact Form (All Fields)", False, f"HTTP {response.status_code}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("Valid Contact Form (All Fields)", False, f"Connection error: {str(e)}")
    
    def test_valid_contact_form_required_only(self):
        """Test valid contact form submission with only required fields"""
        contact_data = {
            "name": "Michael Chen",
            "email": "michael.chen@example.com",
            "message": "Hello, I'm interested in learning more about your sustainable packaging solutions and how they might benefit our business operations."
        }
        
        try:
            response = requests.post(f"{BASE_URL}/contact", json=contact_data, timeout=TIMEOUT)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "id" in data:
                    self.log_test("Valid Contact Form (Required Only)", True, f"Form submitted successfully with ID: {data['id']}")
                else:
                    self.log_test("Valid Contact Form (Required Only)", False, "Success flag missing or no ID returned", data)
            else:
                self.log_test("Valid Contact Form (Required Only)", False, f"HTTP {response.status_code}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("Valid Contact Form (Required Only)", False, f"Connection error: {str(e)}")
    
    def test_invalid_email_format(self):
        """Test invalid email format"""
        contact_data = {
            "name": "John Doe",
            "email": "invalid-email-format",
            "message": "This should fail due to invalid email format."
        }
        
        try:
            response = requests.post(f"{BASE_URL}/contact", json=contact_data, timeout=TIMEOUT)
            
            if response.status_code == 422:  # FastAPI validation error
                self.log_test("Invalid Email Format", True, "Correctly rejected invalid email format")
            elif response.status_code == 400:
                data = response.json()
                if not data.get("success"):
                    self.log_test("Invalid Email Format", True, "Correctly rejected invalid email format")
                else:
                    self.log_test("Invalid Email Format", False, "Should have rejected invalid email", data)
            else:
                self.log_test("Invalid Email Format", False, f"Unexpected status code {response.status_code}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("Invalid Email Format", False, f"Connection error: {str(e)}")
    
    def test_missing_required_fields(self):
        """Test missing required fields"""
        test_cases = [
            ({"email": "test@example.com", "message": "Missing name"}, "Missing Name"),
            ({"name": "John Doe", "message": "Missing email"}, "Missing Email"),
            ({"name": "John Doe", "email": "test@example.com"}, "Missing Message"),
            ({}, "Missing All Fields")
        ]
        
        for contact_data, test_name in test_cases:
            try:
                response = requests.post(f"{BASE_URL}/contact", json=contact_data, timeout=TIMEOUT)
                
                if response.status_code in [400, 422]:  # Bad request or validation error
                    self.log_test(f"Missing Required Fields - {test_name}", True, "Correctly rejected missing required field")
                else:
                    self.log_test(f"Missing Required Fields - {test_name}", False, f"Should have rejected missing field, got {response.status_code}", response.text)
                    
            except requests.exceptions.RequestException as e:
                self.log_test(f"Missing Required Fields - {test_name}", False, f"Connection error: {str(e)}")
    
    def test_field_length_validation(self):
        """Test field length validation"""
        test_cases = [
            ({
                "name": "A",  # Too short (< 2 chars)
                "email": "test@example.com",
                "message": "This message should be long enough to pass validation requirements."
            }, "Name Too Short"),
            ({
                "name": "Valid Name",
                "email": "test@example.com",
                "message": "Short"  # Too short (< 10 chars)
            }, "Message Too Short"),
            ({
                "name": "A" * 101,  # Too long (> 100 chars)
                "email": "test@example.com",
                "message": "This message should be long enough to pass validation requirements."
            }, "Name Too Long"),
            ({
                "name": "Valid Name",
                "email": "test@example.com",
                "organization": "A" * 101,  # Too long (> 100 chars)
                "message": "This message should be long enough to pass validation requirements."
            }, "Organization Too Long"),
            ({
                "name": "Valid Name",
                "email": "test@example.com",
                "message": "A" * 1001  # Too long (> 1000 chars)
            }, "Message Too Long")
        ]
        
        for contact_data, test_name in test_cases:
            try:
                response = requests.post(f"{BASE_URL}/contact", json=contact_data, timeout=TIMEOUT)
                
                if response.status_code in [400, 422]:
                    self.log_test(f"Field Length Validation - {test_name}", True, "Correctly rejected invalid field length")
                else:
                    self.log_test(f"Field Length Validation - {test_name}", False, f"Should have rejected invalid length, got {response.status_code}", response.text)
                    
            except requests.exceptions.RequestException as e:
                self.log_test(f"Field Length Validation - {test_name}", False, f"Connection error: {str(e)}")
    
    def test_invalid_interest_selection(self):
        """Test invalid interest selection"""
        contact_data = {
            "name": "Jane Smith",
            "email": "jane@example.com",
            "interest": "Invalid Interest Option",
            "message": "This should fail due to invalid interest selection."
        }
        
        try:
            response = requests.post(f"{BASE_URL}/contact", json=contact_data, timeout=TIMEOUT)
            
            if response.status_code in [400, 422]:
                self.log_test("Invalid Interest Selection", True, "Correctly rejected invalid interest option")
            else:
                self.log_test("Invalid Interest Selection", False, f"Should have rejected invalid interest, got {response.status_code}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("Invalid Interest Selection", False, f"Connection error: {str(e)}")
    
    def test_valid_interest_options(self):
        """Test all valid interest options"""
        valid_interests = [
            "Learning about products",
            "Partnership opportunities", 
            "Joining the community",
            "Research collaboration",
            "Bulk orders",
            "Other"
        ]
        
        for interest in valid_interests:
            contact_data = {
                "name": "Test User",
                "email": f"test.{interest.replace(' ', '').lower()}@example.com",
                "interest": interest,
                "message": f"Testing with interest option: {interest}"
            }
            
            try:
                response = requests.post(f"{BASE_URL}/contact", json=contact_data, timeout=TIMEOUT)
                
                if response.status_code == 200:
                    data = response.json()
                    if data.get("success"):
                        self.log_test(f"Valid Interest - {interest}", True, "Interest option accepted")
                    else:
                        self.log_test(f"Valid Interest - {interest}", False, "Success flag missing", data)
                else:
                    self.log_test(f"Valid Interest - {interest}", False, f"HTTP {response.status_code}", response.text)
                    
            except requests.exceptions.RequestException as e:
                self.log_test(f"Valid Interest - {interest}", False, f"Connection error: {str(e)}")
    
    def test_get_contact_submissions(self):
        """Test GET /api/contact endpoint to verify submissions are saved"""
        try:
            response = requests.get(f"{BASE_URL}/contact", timeout=TIMEOUT)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("Get Contact Submissions", True, f"Retrieved {len(data)} submissions from database")
                    
                    # Check if our test submissions are in the database
                    if len(data) > 0:
                        sample_submission = data[0]
                        required_fields = ["id", "name", "email", "message", "submitted_at", "status"]
                        missing_fields = [field for field in required_fields if field not in sample_submission]
                        
                        if not missing_fields:
                            self.log_test("Database Schema Validation", True, "All required fields present in submissions")
                        else:
                            self.log_test("Database Schema Validation", False, f"Missing fields: {missing_fields}")
                else:
                    self.log_test("Get Contact Submissions", False, "Response is not a list", data)
            else:
                self.log_test("Get Contact Submissions", False, f"HTTP {response.status_code}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("Get Contact Submissions", False, f"Connection error: {str(e)}")
    
    def test_malformed_json(self):
        """Test malformed JSON request"""
        try:
            response = requests.post(
                f"{BASE_URL}/contact", 
                data="invalid json data",
                headers={"Content-Type": "application/json"},
                timeout=TIMEOUT
            )
            
            if response.status_code in [400, 422]:
                self.log_test("Malformed JSON", True, "Correctly rejected malformed JSON")
            else:
                self.log_test("Malformed JSON", False, f"Should have rejected malformed JSON, got {response.status_code}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("Malformed JSON", False, f"Connection error: {str(e)}")
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting GreenLoop Project Backend API Tests")
        print(f"📡 Testing API at: {BASE_URL}")
        print("=" * 60)
        
        # Run all tests
        self.test_api_health_check()
        self.test_valid_contact_form_all_fields()
        self.test_valid_contact_form_required_only()
        self.test_invalid_email_format()
        self.test_missing_required_fields()
        self.test_field_length_validation()
        self.test_invalid_interest_selection()
        self.test_valid_interest_options()
        self.test_malformed_json()
        
        # Test database integration last (after we've added some data)
        time.sleep(2)  # Give database time to process
        self.test_get_contact_submissions()
        
        # Print summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"✅ Passed: {len(self.passed_tests)}")
        print(f"❌ Failed: {len(self.failed_tests)}")
        print(f"📈 Success Rate: {len(self.passed_tests)}/{len(self.test_results)} ({len(self.passed_tests)/len(self.test_results)*100:.1f}%)")
        
        if self.failed_tests:
            print("\n🔍 FAILED TESTS:")
            for test in self.failed_tests:
                print(f"   • {test}")
        
        return len(self.failed_tests) == 0

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 All tests passed!")
        exit(0)
    else:
        print(f"\n⚠️  {len(tester.failed_tests)} test(s) failed!")
        exit(1)