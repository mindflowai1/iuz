from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas
from ..database import get_db

router = APIRouter(
    prefix="/lawyers",
    tags=["lawyers"],
)

@router.post("/", response_model=schemas.Lawyer)
def create_lawyer(lawyer: schemas.LawyerCreate, db: Session = Depends(get_db)):
    db_lawyer = models.Lawyer(**lawyer.dict())
    db.add(db_lawyer)
    db.commit()
    db.refresh(db_lawyer)
    return db_lawyer

@router.get("/", response_model=List[schemas.Lawyer])
def read_lawyers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    lawyers = db.query(models.Lawyer).offset(skip).limit(limit).all()
    return lawyers

@router.get("/search", response_model=List[schemas.Lawyer])
def search_lawyers(q: str, db: Session = Depends(get_db)):
    lawyers = db.query(models.Lawyer).filter(models.Lawyer.name.ilike(f"%{q}%")).limit(10).all()
    return lawyers

@router.get("/{lawyer_id}", response_model=schemas.Lawyer)
def read_lawyer(lawyer_id: int, db: Session = Depends(get_db)):
    db_lawyer = db.query(models.Lawyer).filter(models.Lawyer.id == lawyer_id).first()
    if db_lawyer is None:
        raise HTTPException(status_code=404, detail="Lawyer not found")
    return db_lawyer

@router.put("/{lawyer_id}", response_model=schemas.Lawyer)
def update_lawyer(lawyer_id: int, lawyer: schemas.LawyerCreate, db: Session = Depends(get_db)):
    db_lawyer = db.query(models.Lawyer).filter(models.Lawyer.id == lawyer_id).first()
    if db_lawyer is None:
        raise HTTPException(status_code=404, detail="Lawyer not found")
    
    for key, value in lawyer.dict().items():
        setattr(db_lawyer, key, value)
    
    db.commit()
    db.refresh(db_lawyer)
    return db_lawyer

@router.delete("/{lawyer_id}")
def delete_lawyer(lawyer_id: int, db: Session = Depends(get_db)):
    db_lawyer = db.query(models.Lawyer).filter(models.Lawyer.id == lawyer_id).first()
    if db_lawyer is None:
        raise HTTPException(status_code=404, detail="Lawyer not found")
    
    db.delete(db_lawyer)
    db.commit()
    return {"ok": True}
