
import os
import sys
from dotenv import find_dotenv

print(f"CWD: {os.getcwd()}")
print(f"Python: {sys.executable}")

env_path = find_dotenv()
print(f"Dotenv found at: {env_path}")

if env_path:
    try:
        with open(env_path, "rb") as f:
            header = f.read(4)
        print(f"File Header Hex: {header.hex()}")
    except Exception as e:
        print(f"Error reading file: {e}")
else:
    print("No .env file found by find_dotenv()")
