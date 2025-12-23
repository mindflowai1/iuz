"""
Contacts router - Supabase native implementation
"""
from fastapi import APIRouter, Depends, HTTPException, status, Body
from supabase import Client
from typing import List, Dict, Any

from ..database import get_supabase

router = APIRouter(
    prefix="/contacts",
    tags=["contacts"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_contact(contact: Dict[str, Any] = Body(...), supabase: Client = Depends(get_supabase)):
    """Create a new contact"""
    try:
        response = supabase.table("contacts").insert(contact).execute()
        return response.data[0] if response.data else {}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/")
def read_contacts(skip: int = 0, limit: int = 100, supabase: Client = Depends(get_supabase)):
    """Get all contacts"""
    try:
        response = (
            supabase.table("contacts")
            .select("*")
            .range(skip, skip + limit - 1)
            .execute()
        )
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{contact_id}")
def read_contact(contact_id: int, supabase: Client = Depends(get_supabase)):
    """Get a specific contact"""
    try:
        response = (
            supabase.table("contacts")
            .select("*")
            .eq("id", contact_id)
            .execute()
        )
        if not response.data:
            raise HTTPException(status_code=404, detail="Contact not found")
        return response.data[0]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{contact_id}")
def update_contact(contact_id: int, contact_update: Dict[str, Any] = Body(...), supabase: Client = Depends(get_supabase)):
    """Update a contact"""
    try:
        # Check if contact exists
        check_response = supabase.table("contacts").select("id").eq("id", contact_id).execute()
        if not check_response.data:
            raise HTTPException(status_code=404, detail="Contact not found")
        
        # Update contact
        response = (
            supabase.table("contacts")
            .update(contact_update)
            .eq("id", contact_id)
            .execute()
        )
        return response.data[0] if response.data else {}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{contact_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_contact(contact_id: int, supabase: Client = Depends(get_supabase)):
    """Delete a contact"""
    try:
        # Check if contact exists
        check_response = supabase.table("contacts").select("id").eq("id", contact_id).execute()
        if not check_response.data:
            raise HTTPException(status_code=404, detail="Contact not found")
        
        # Delete contact
        supabase.table("contacts").delete().eq("id", contact_id).execute()
        return None
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
