"""
Users router - Supabase native implementation
"""
from fastapi import APIRouter, Depends, HTTPException, status, Body
from supabase import Client
from typing import Dict, Any

from ..database import get_supabase

router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)

@router.get("/me")
def get_my_profile(email: str, supabase: Client = Depends(get_supabase)):
    """
    Get the profile of the currently logged-in user by email.
    In a real app, this would use the JWT token to identify the user.
    For this MVP, we pass the email as a query parameter.
    """
    try:
        response = (
            supabase.table("user_profiles")
            .select("*")
            .eq("email", email)
            .execute()
        )
        
        if not response.data:
            # Auto-create profile if it doesn't exist (first login)
            new_user = {
                "email": email,
                "name": email.split('@')[0],
                "role": "Admin"
            }
            create_response = supabase.table("user_profiles").insert(new_user).execute()
            return create_response.data[0] if create_response.data else new_user
        
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/me")
def update_my_profile(profile: Dict[str, Any] = Body(...), email: str = Body(...), supabase: Client = Depends(get_supabase)):
    """
    Update the current user's profile.
    """
    try:
        # Check if user exists
        check_response = (
            supabase.table("user_profiles")
            .select("id")
            .eq("email", email)
            .execute()
        )
        
        if not check_response.data:
            # Create if not exists
            profile["email"] = email
            create_response = supabase.table("user_profiles").insert(profile).execute()
            return create_response.data[0] if create_response.data else {}
        
        # Update existing user
        response = (
            supabase.table("user_profiles")
            .update(profile)
            .eq("email", email)
            .execute()
        )
        return response.data[0] if response.data else {}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
