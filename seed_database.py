"""
Script para popular o banco de dados com dados de exemplo
"""
from sqlalchemy.orm import Session
from backend.database import SessionLocal, engine, Base
from backend import models
from datetime import datetime, timedelta

# Criar tabelas se não existirem
Base.metadata.create_all(bind=engine)

def seed_database():
    db = SessionLocal()
    
    try:
        # Limpar dados existentes (opcional - comente se quiser manter dados)
        # db.query(models.Deal).delete()
        # db.query(models.Contact).delete()
        # db.query(models.Lawyer).delete()
        
        # Verificar se já existem dados
        existing_contacts = db.query(models.Contact).count()
        if existing_contacts > 0:
            print(f"✓ Banco já possui {existing_contacts} contatos. Pulando seed...")
            return
        
        print("Criando dados de exemplo...")
        
        # Criar Contatos
        contato1 = models.Contact(
            name="João Silva",
            email="joao.silva@email.com",
            phone="(11) 99999-1111"
        )
        contato2 = models.Contact(
            name="Maria Santos",
            email="maria.santos@email.com",
            phone="(11) 99999-2222"
        )
        contato3 = models.Contact(
            name="Pedro Franco",
            email="pedro.franco@email.com",
            phone="(11) 99999-3333"
        )
        contato4 = models.Contact(
            name="Imobiliária House",
            email="contato@house.com.br",
            phone="(11) 3333-4444"
        )
        
        db.add_all([contato1, contato2, contato3, contato4])
        db.commit()
        
        # Criar Advogados
        advogado1 = models.Lawyer(
            name="Dr. Roberto",
            email="roberto@escritorio.com",
            oab="SP123456",
            specialty="Família"
        )
        advogado2 = models.Lawyer(
            name="Dra. Ana",
            email="ana@escritorio.com",
            oab="SP654321",
            specialty="Trabalhista"
        )
        
        db.add_all([advogado1, advogado2])
        db.commit()
        
        # Criar Deals
        deal1 = models.Deal(
            title="Divórcio Silva x Silva",
            stage="Triagem",
            value=35000.00,
            contact_id=contato1.id,
            process_number="0012345-67.2024.8.26.0100",
            court="1ª Vara Família - SP",
            urgency_level="High",
            next_activity_date=datetime.now() + timedelta(days=1),
            owner_id=advogado1.id
        )
        
        deal2 = models.Deal(
            title="Ação Trabalhista XPTO",
            stage="Análise",
            value=120000.00,
            contact_id=contato2.id,
            urgency_level="Medium",
            next_activity_date=datetime.now() + timedelta(days=9),
            owner_id=advogado2.id
        )
        
        deal3 = models.Deal(
            title="Inventário Franco",
            stage="Proposta",
            value=850000.00,
            contact_id=contato3.id,
            urgency_level="Low",
            next_activity_date=datetime.now() + timedelta(days=2),
            owner_id=advogado1.id
        )
        
        deal4 = models.Deal(
            title="Execução Aluguéis",
            stage="Fechado",
            value=15000.00,
            contact_id=contato4.id,
            process_number="0054321-12.2023.8.26.0000",
            urgency_level="Urgent",
            next_activity_date=datetime.now(),
            owner_id=advogado2.id
        )
        
        db.add_all([deal1, deal2, deal3, deal4])
        db.commit()
        
        print("✓ Banco de dados populado com sucesso!")
        print(f"  - {db.query(models.Contact).count()} contatos")
        print(f"  - {db.query(models.Lawyer).count()} advogados")
        print(f"  - {db.query(models.Deal).count()} deals")
        
    except Exception as e:
        print(f"✗ Erro ao popular banco: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
