from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session, joinedload
from typing import List

from .. import models, schemas
from ..database import get_db
from .automation import trigger_deal_automation

router = APIRouter(
    prefix="/deals",
    tags=["deals"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=schemas.Deal, status_code=status.HTTP_201_CREATED)
def create_deal(deal: schemas.DealCreate, db: Session = Depends(get_db)):
    # Verify contact exists
    contact = db.query(models.Contact).filter(models.Contact.id == deal.contact_id).first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")

    new_deal = models.Deal(**deal.dict())
    db.add(new_deal)
    db.commit()
    db.refresh(new_deal)
    return new_deal

@router.get("/", response_model=List[schemas.Deal])
def read_deals(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    deals = db.query(models.Deal).options(
        joinedload(models.Deal.contact),
        joinedload(models.Deal.owner)
    ).offset(skip).limit(limit).all()
    return deals

@router.put("/{deal_id}/stage", response_model=schemas.Deal)
def update_deal_stage(
    deal_id: int, 
    stage_update: schemas.DealUpdate, 
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    db_deal = db.query(models.Deal).filter(models.Deal.id == deal_id).first()
    if not db_deal:
        raise HTTPException(status_code=404, detail="Deal not found")
    
    if stage_update.stage:
        old_stage = db_deal.stage
        db_deal.stage = stage_update.stage
        db.commit()
        db.refresh(db_deal)
        
        # Trigger automation in background
        background_tasks.add_task(
            trigger_deal_automation, 
            deal_id=db_deal.id, 
            new_stage=stage_update.stage, 
            db=db
        )
        
    return db_deal

@router.put("/{deal_id}", response_model=schemas.Deal)
def update_deal(deal_id: int, deal_update: schemas.DealUpdate, db: Session = Depends(get_db)):
    db_deal = db.query(models.Deal).filter(models.Deal.id == deal_id).first()
    if not db_deal:
        raise HTTPException(status_code=404, detail="Deal not found")
    
    update_data = deal_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_deal, key, value)
    
    db.commit()
    db.refresh(db_deal)
    return db_deal

@router.delete("/{deal_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_deal(deal_id: int, db: Session = Depends(get_db)):
    db_deal = db.query(models.Deal).filter(models.Deal.id == deal_id).first()
    if not db_deal:
        raise HTTPException(status_code=404, detail="Deal not found")
    
    db.delete(db_deal)
    db.commit()
    return None
