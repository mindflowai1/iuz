#!/usr/bin/env python3
"""
Teste do PUT com deal completo para diagnosticar erro 500
"""
import requests
import json

url = "http://localhost:8000/api/v1/deals/2"

# Simular o que o frontend envia
data = {
    "id": 2,
    "title": "Ação Trabalhista XPTO",
    "stage": "triagem",
    "value": 120000,
    "contact_id": 2,
    "contact_name": "Maria Santos",
    "owner_id": 1,
    "owner_name": "Dr. Roberto Augusto",
    "contact": {
        "id": 2,
        "name": "Maria Santos",
        "email": "maria.santos@email.com"
    },
    "owner": {
        "id": 1,
        "name": "Dr. Roberto Augusto",
        "email": "roberto@escritorio.com"
    }
}

print(f"Testing PUT {url}")
print(f"Changing stage to: triagem")

try:
    response = requests.put(url, json=data, timeout=5)
    print(f"\nStatus Code: {response.status_code}")
    
    if response.status_code == 200:
        print("✅ SUCCESS!")
        print(f"Response: {response.json()}")
    else:
        print(f"❌ Error: {response.status_code}")
        print(f"Response: {response.text}")
except Exception as e:
    print(f"\n❌ Error: {e}")
