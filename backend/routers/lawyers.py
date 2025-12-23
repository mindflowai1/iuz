"""
Lawyers router - Supabase native implementation
"""
from fastapi import APIRouter, Depends, HTTPException, status, Body
from supabase import Client
from typing import List, Dict, Any

from ..database import get_supabase

router = APIRouter(
    prefix="/lawyers",
    tags=["lawyers"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_lawyer(lawyer: Dict[str, Any] = Body(...), supabase: Client = Depends(get_supabase)):
    """Create a new lawyer"""
    try:
        response = supabase.table("lawyers").insert(lawyer).execute()
        return response.data[0] if response.data else {}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/")
def read_lawyers(skip: int = 0, limit: int = 100, supabase: Client = Depends(get_supabase)):
    """Get all lawyers"""
    try:
        response = (
            supabase.table("lawyers")
            .select("*")
            .range(skip, skip + limit - 1)
            .execute()
        )
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{lawyer_id}")
def read_lawyer(lawyer_id: int, supabase: Client = Depends(get_supabase)):
    """Get a specific lawyer"""
    try:
        response = (
            supabase.table("lawyers")
            .select("*")
            .eq("id", lawyer_id)
            .execute()
        )
        if not response.data:
            raise HTTPException(status_code=404, detail="Lawyer not found")
        return response.data[0]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{lawyer_id}")
def update_lawyer(lawyer_id: int, lawyer_update: Dict[str, Any] = Body(...), supabase: Client = Depends(get_supabase)):
    """Update a lawyer"""
    try:
        # Check if lawyer exists
        check_response = supabase.table("lawyers").select("id").eq("id", lawyer_id).execute()
        if not check_response.data:
            raise HTTPException(status_code=404, detail="Lawyer not found")
        
        # Update lawyer
        response = (
            supabase.table("lawyers")
            .update(lawyer_update)
            .eq("id", lawyer_id)
            .execute()
        )
        return response.data[0] if response.data else {}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{lawyer_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_lawyer(lawyer_id: int, supabase: Client = Depends(get_supabase)):
    """Delete a lawyer"""
    try:
        # Check if lawyer exists
        check_response = supabase.table("lawyers").select("id").eq("id", lawyer_id).execute()
        if not check_response.data:
            raise HTTPException(status_code=404, detail="Lawyer not found")
        
        # Delete lawyer
        supabase.table("lawyers").delete().eq("id", lawyer_id).execute()
        return None
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
