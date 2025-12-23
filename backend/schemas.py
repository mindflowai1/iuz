from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from enum import Enum

# Forward references
class Contact(BaseModel):
    pass

class Deal(BaseModel):
    pass

# Enums shared with models
class DealStageEnum(str, Enum):
    TRIAGEM = "triagem"
    ANALISE = "analise"
    PROPOSTA = "proposta"
    FECHADO = "fechado"
    EXECUCAO = "execucao"

class ActivityStatusEnum(str, Enum):
    PENDING = "Pendente"
    DONE = "Concluído"

# --- Document Schemas ---
class DocumentBase(BaseModel):
    title: str
    file_url: str
    file_type: Optional[str] = None

class DocumentCreate(DocumentBase):
    deal_id: int

class Document(DocumentBase):
    id: int
    created_at: datetime
    deal_id: int

    class Config:
        from_attributes = True

# --- Activity Schemas ---
class ActivityBase(BaseModel):
    title: str
    description: Optional[str] = None
    due_date: datetime
    status: ActivityStatusEnum = ActivityStatusEnum.PENDING

class ActivityCreate(ActivityBase):
    deal_id: int

class Activity(ActivityBase):
    id: int
    created_at: datetime
    deal_id: int

    class Config:
        from_attributes = True

# --- Deal Schemas ---
class DealBase(BaseModel):
    title: str
    stage: DealStageEnum = DealStageEnum.TRIAGEM
    value: float = 0.0
    contact_id: int
    description: Optional[str] = None
    
    # LegalOps Fields
    process_number: Optional[str] = None
    court: Optional[str] = None
    urgency_level: str = "Medium"
    next_activity_date: Optional[datetime] = None
    owner_id: Optional[int] = None

class DealCreate(DealBase):
    pass

class DealUpdate(BaseModel):
    title: Optional[str] = None
    stage: Optional[DealStageEnum] = None
    value: Optional[float] = None
    description: Optional[str] = None
    process_number: Optional[str] = None
    court: Optional[str] = None
    urgency_level: Optional[str] = None
    next_activity_date: Optional[datetime] = None
    contact_id: Optional[int] = None
    owner_id: Optional[int] = None

class Deal(DealBase):
    id: int
    created_at: datetime
    contact_id: int
    activities: List[Activity] = []
    documents: List[Document] = []
    # Computed fields for frontend
    contact_name: str = ""
    owner_name: str = ""
    # Note: Contact will be loaded via logic or we can add it here if circular dependencies are managed.
    # For now, let's keep it simple to avoid circular imports 
    # but theoretically we might want 'contact: Contact' here.

    class Config:
        from_attributes = True

# --- Contact Schemas ---
class ContactBase(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None

class ContactCreate(ContactBase):
    pass

class ContactUpdate(ContactBase):
    pass

class Contact(ContactBase):
    id: int
    created_at: datetime
    deals: List[Deal] = []

    class Config:
        from_attributes = True

# --- Lawyer Schemas ---
class LawyerBase(BaseModel):
    name: str
    email: str
    oab: Optional[str] = None
    specialty: Optional[str] = None

class LawyerCreate(LawyerBase):
    pass

class Lawyer(LawyerBase):
    id: int
    created_at: datetime
    deals: List[Deal] = []

    class Config:
        from_attributes = True

# UserProfile Schemas
class UserProfileBase(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    role: Optional[str] = "Admin"

class UserProfileCreate(UserProfileBase):
    email: str

class UserProfileUpdate(UserProfileBase):
    email: Optional[str] = None

class UserProfile(UserProfileBase):
    id: int
    email: str
    created_at: datetime

    class Config:
        from_attributes = True

# Resolve forward ref if needed (Pydantic usually handles this with strings but explicit update can help)
Deal.update_forward_refs()
Contact.update_forward_refs()
Lawyer.update_forward_refs()
UserProfile.update_forward_refs()
