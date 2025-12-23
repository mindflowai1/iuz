from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from .. import models, schemas

def trigger_deal_automation(deal_id: int, new_stage: str, db: Session):
    """
    Business logic triggering automations based on Deal Stage changes.
    """
    print(f"Executing automation for Deal {deal_id} -> {new_stage}")
    
    # Automation Rule: If stage is "Reunião Agendada" -> Create preparation task
    if new_stage == schemas.DealStageEnum.MEETING_SCHEDULED:
        deal = db.query(models.Deal).filter(models.Deal.id == deal_id).first()
        if not deal:
            return
            
        contact_name = deal.contact.name if deal.contact else "Cliente"
        
        # Create Activity
        new_activity = models.Activity(
            title=f"Preparar Documentação para Reunião com {contact_name}",
            description="Gerar contrato preliminar, revisar histórico do caso e preparar pauta.",
            due_date=datetime.utcnow() + timedelta(hours=24),
            deal_id=deal.id,
            status=models.ActivityStatus.PENDING
        )
        
        db.add(new_activity)
        db.commit()
        print(f"Automation Created: Task for {contact_name}")
