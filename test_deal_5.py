#!/usr/bin/env python3
"""
Teste específico para deal #5
"""
import requests
import json

url = "http://localhost:8000/api/v1/deals/5"
data = {"stage": "triagem"}

print(f"Testing PUT {url}")
print(f"Body: {json.dumps(data)}")

try:
    response = requests.put(url, json=data, timeout=5)
    print(f"\nStatus Code: {response.status_code}")
    print(f"Response: {response.text}")
    
    if response.status_code == 200:
        print("\n✅ SUCCESS!")
    else:
        print(f"\n❌ Error: {response.status_code}")
        print(f"Details: {response.text}")
except Exception as e:
    print(f"\n❌ Error: {e}")
