"""
FastAPI Main Application - Supabase native implementation
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import contacts, deals, lawyers, users

app = FastAPI(title="CRM Jurídico API", version="1.0.0")

# Configuração CORS - CRÍTICO para permitir requisições do frontend
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(contacts.router, prefix="/api/v1")
app.include_router(deals.router, prefix="/api/v1")
app.include_router(lawyers.router, prefix="/api/v1")
app.include_router(users.router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "CRM Jurídico Core Service is running with Supabase!"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "database": "supabase"}
