import requests
import sys
import time

BASE_URL = "http://127.0.0.1:8000"

def test_backend_health():
    print(f"Testing connectivity to {BASE_URL}...")
    try:
        # 1. Health Check
        print("1. Checking /health endpoint...")
        resp = requests.get(f"{BASE_URL}/health")
        if resp.status_code == 200:
            print("✅ Health check PASSED")
        else:
            print(f"❌ Health check FAILED: {resp.status_code}")
            return False

        # 2. Check OpenAPI Docs
        print("2. Checking /docs endpoint...")
        resp = requests.get(f"{BASE_URL}/docs")
        if resp.status_code == 200:
            print("✅ OpenAPI Docs PASSED")
        else:
            print(f"❌ OpenAPI Docs FAILED: {resp.status_code}")
            return False

        # 3. Check Banks Endpoint (Public)
        print("3. Checking /api/banks endpoint...")
        resp = requests.get(f"{BASE_URL}/api/banks")
        if resp.status_code == 200:
            print(f"✅ Banks endpoint PASSED (Returned {len(resp.json())} banks)")
        else:
            print(f"❌ Banks endpoint FAILED: {resp.status_code} - {resp.text}")
            return False

        print("\n🎉 Backend verification SUCCESSFUL! Server is running and accessible.")
        return True

    except requests.exceptions.ConnectionError:
        print(f"\n❌ Could not connect to {BASE_URL}. Is the server running?")
        print("Try running: cd backend && python -m uvicorn app.main:app --reload")
        return False
    except Exception as e:
        print(f"\n❌ Verification failed with error: {str(e)}")
        return False

if __name__ == "__main__":
    success = test_backend_health()
    sys.exit(0 if success else 1)
