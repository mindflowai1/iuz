#!/usr/bin/env python3
"""
Teste com deal completo (simulando o que o frontend envia)
"""
import requests
import json

url = "http://localhost:8000/api/v1/deals/5"

# Simular o que o frontend envia (deal completo com objetos aninhados)
data = {
    "id": 5,
    "title": "Compra de Casa Milionária",
    "stage": "execucao",  # Mudando para execucao
    "value": 350000,
    "contact_id": 5,
    "contact": {  # OBJETO ANINHADO que vem do join
        "id": 5,
        "name": "Jean Lopes",
        "email": "creaty12345@gmail.com"
    },
    "owner_id": 1,
    "owner": {  # OBJETO ANINHADO que vem do join
        "id": 1,
        "name": "Dr. Roberto Augusto",
        "email": "roberto@escritorio.com"
    },
    "process_number": "000000000000000000012151",
    "court": "Ciível / SP",
    "urgency_level": "Medium",
    "next_activity_date": "2025-12-26T00:00:00",
    "created_at": "2025-12-23T14:28:57.398283",
    "description": None
}

print(f"Testing PUT {url}")
print(f"Body (with nested objects): {json.dumps(data, indent=2)}")

try:
    response = requests.put(url, json=data, timeout=5)
    print(f"\nStatus Code: {response.status_code}")
    print(f"Response: {response.text[:200]}...")
    
    if response.status_code == 200:
        print("\n✅ SUCCESS! Drag & drop should work now!")
    else:
        print(f"\n❌ Error: {response.status_code}")
except Exception as e:
    print(f"\n❌ Error: {e}")
