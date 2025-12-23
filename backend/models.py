from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float, Text, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from .database import Base

class DealStage(str, enum.Enum):
    TRIAGEM = "triagem"
    ANALISE = "analise"
    PROPOSTA = "proposta"
    FECHADO = "fechado"
    EXECUCAO = "execucao"

class ActivityStatus(str, enum.Enum):
    PENDING = "Pendente"
    DONE = "Concluído"

class Contact(Base):
    __tablename__ = "contacts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    phone = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    deals = relationship("Deal", back_populates="contact")

class Deal(Base):
    __tablename__ = "deals"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    stage = Column(String, default=DealStage.TRIAGEM)
    value = Column(Float, default=0.0)
    contact_id = Column(Integer, ForeignKey("contacts.id"))
    
    # LegalOps Fields
    process_number = Column(String, nullable=True)
    court = Column(String, nullable=True)
    description = Column(String, nullable=True)
    urgency_level = Column(String, default="Medium") # Low, Medium, High, Urgent
    next_activity_date = Column(DateTime, nullable=True)
    owner_id = Column(Integer, ForeignKey("lawyers.id"), nullable=True) # Changed to FK
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    contact = relationship("Contact", back_populates="deals")
    activities = relationship("Activity", back_populates="deal")
    documents = relationship("Document", back_populates="deal")
    owner = relationship("Lawyer", back_populates="deals")

    @property
    def contact_name(self):
        return self.contact.name if self.contact else None

    @property
    def owner_name(self):
        return self.owner.name if self.owner else None

class Lawyer(Base):
    __tablename__ = "lawyers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    oab = Column(String, nullable=True)
    specialty = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    deals = relationship("Deal", back_populates="owner")

class Activity(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(Text, nullable=True)
    due_date = Column(DateTime)
    status = Column(String, default=ActivityStatus.PENDING)
    deal_id = Column(Integer, ForeignKey("deals.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    deal = relationship("Deal", back_populates="activities")

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    file_url = Column(String)
    file_type = Column(String, nullable=True) # e.g. "pdf", "docx"
    deal_id = Column(Integer, ForeignKey("deals.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    deal = relationship("Deal", back_populates="documents")

class UserProfile(Base):
    __tablename__ = "user_profiles"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    address = Column(String, nullable=True)
    role = Column(String, default="Admin")
    created_at = Column(DateTime, default=datetime.utcnow)
