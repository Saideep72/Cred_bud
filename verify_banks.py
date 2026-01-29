import requests
import sys

URL = "http://127.0.0.1:8000/api/banks"

try:
    print(f"Fetching from {URL}...")
    resp = requests.get(URL)
    print(f"Status: {resp.status_code}")
    if resp.status_code == 200:
        data = resp.json()
        print(f"Received {len(data)} banks.")
        print("First bank sample:", data[0])
    else:
        print("Error:", resp.text)
except Exception as e:
    print("Exception:", e)
