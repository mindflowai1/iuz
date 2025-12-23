import sys
import os

# Add backend directory to Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from backend.main import app

# Vercel expects a handler callable
# For ASGI apps like FastAPI, we export the app directly
app = app
