"""
Deals router - Supabase native implementation
"""
from fastapi import APIRouter, Depends, HTTPException, status, Body
from supabase import Client
from typing import List, Dict, Any

from ..database import get_supabase

router = APIRouter(
    prefix="/deals",
    tags=["deals"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_deal(deal: Dict[str, Any] = Body(...), supabase: Client = Depends(get_supabase)):
    """Create a new deal"""
    try:
        # Verify contact exists
        contact_response = supabase.table("contacts").select("id").eq("id", deal.get("contact_id")).execute()
        if not contact_response.data:
            raise HTTPException(status_code=404, detail="Contact not found")
        
        # Insert deal
        response = supabase.table("deals").insert(deal).execute()
        return response.data[0] if response.data else {}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/")
def read_deals(skip: int = 0, limit: int = 100, supabase: Client = Depends(get_supabase)):
    """Get all deals with related data"""
    try:
        response = (
            supabase.table("deals")
            .select("*, contact:contacts(id, name, email), owner:lawyers(id, name, email)")
            .range(skip, skip + limit - 1)
            .execute()
        )
        
        # Add contact_name and owner_name for frontend compatibility
        deals = response.data
        for deal in deals:
            if deal.get('contact'):
                deal['contact_name'] = deal['contact'].get('name', '---')
                deal['contact_id'] = deal['contact'].get('id')
            else:
                deal['contact_name'] = '---'
            
            if deal.get('owner'):
                deal['owner_name'] = deal['owner'].get('name', '---')
                deal['owner_id'] = deal['owner'].get('id')
            else:
                deal['owner_name'] = '---'
        
        return deals
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{deal_id}")
def read_deal(deal_id: int, supabase: Client = Depends(get_supabase)):
    """Get a specific deal"""
    try:
        response = (
            supabase.table("deals")
            .select("*, contact:contacts(*), owner:lawyers(*)")
            .eq("id", deal_id)
            .execute()
        )
        if not response.data:
            raise HTTPException(status_code=404, detail="Deal not found")
        return response.data[0]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{deal_id}")
def update_deal(deal_id: int, deal_update: Dict[str, Any] = Body(...), supabase: Client = Depends(get_supabase)):
    """Update a deal"""
    try:
        # Check if deal exists
        check_response = supabase.table("deals").select("id").eq("id", deal_id).execute()
        if not check_response.data:
            raise HTTPException(status_code=404, detail="Deal not found")
        
        # Clean nested objects (contact, owner) and virtual fields (contact_name, owner_name)
        # Supabase doesn't accept nested objects or non-existent columns in UPDATE
        clean_update = {k: v for k, v in deal_update.items() 
                       if k not in ['contact', 'owner', 'id', 'contact_name', 'owner_name']}
        
        # Update deal
        response = (
            supabase.table("deals")
            .update(clean_update)
            .eq("id", deal_id)
            .execute()
        )
        return response.data[0] if response.data else {}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{deal_id}/stage")
def update_deal_stage(deal_id: int, stage_update: Dict[str, Any] = Body(...), supabase: Client = Depends(get_supabase)):
    """Update deal stage"""
    try:
        # Check if deal exists
        check_response = supabase.table("deals").select("id, stage").eq("id", deal_id).execute()
        if not check_response.data:
            raise HTTPException(status_code=404, detail="Deal not found")
        
        # Update stage
        if "stage" in stage_update:
            response = (
                supabase.table("deals")
                .update({"stage": stage_update["stage"]})
                .eq("id", deal_id)
                .execute()
            )
            return response.data[0] if response.data else {}
        
        return check_response.data[0]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{deal_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_deal(deal_id: int, supabase: Client = Depends(get_supabase)):
    """Delete a deal"""
    try:
        # Check if deal exists
        check_response = supabase.table("deals").select("id").eq("id", deal_id).execute()
        if not check_response.data:
            raise HTTPException(status_code=404, detail="Deal not found")
        
        # Delete deal
        supabase.table("deals").delete().eq("id", deal_id).execute()
        return None
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
