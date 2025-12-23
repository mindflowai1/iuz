from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from .. import models, schemas
from ..database import get_db

router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)

@router.get("/me", response_model=schemas.UserProfile)
def get_my_profile(email: str, db: Session = Depends(get_db)):
    """
    Get the profile of the currently logged-in user by email.
    In a real app, this would use the JWT token to identify the user.
    For this MVP, we pass the email as a query parameter.
    """
    user = db.query(models.UserProfile).filter(models.UserProfile.email == email).first()
    if not user:
        # Auto-create profile if it doesn't exist (first login)
        user = models.UserProfile(email=email, name=email.split('@')[0])
        db.add(user)
        db.commit()
        db.refresh(user)
    return user

@router.put("/me", response_model=schemas.UserProfile)
def update_my_profile(profile: schemas.UserProfileUpdate, email: str, db: Session = Depends(get_db)):
    """
    Update the current user's profile.
    """
    db_user = db.query(models.UserProfile).filter(models.UserProfile.email == email).first()
    if not db_user:
        # Create if not exists associated with the update
        db_user = models.UserProfile(email=email)
        db.add(db_user)
    
    # Update fields
    if profile.name is not None:
        db_user.name = profile.name
    if profile.phone is not None:
        db_user.phone = profile.phone
    if profile.address is not None:
        db_user.address = profile.address
    
    db.commit()
    db.refresh(db_user)
    return db_user
