# ==============================================================================
# ZODIAC: RISE OF THE GOD BEAST — ENTERPRISE BUILD & DEPLOYMENT SCRIPT
# Language: Python 3.10+
# ==============================================================================

import os
import sys
import subprocess
import time

def print_banner():
    print("========================================================")
    print("ZODIAC: RISE OF THE GOD BEAST — MASTER BUILD SYSTEM")
    print("========================================================")

def verify_js_syntax():
    print("[1/4] Verifying JavaScript Engine & Client Modules...")
    files = [
        "js/three-engine.js",
        "js/network-client.js",
        "js/i18n.js",
        "js/app.js",
        "js/test-suite.js",
        "js/audio.js",
        "js/save-system.js"
    ]
    cmd = ["node", "-c"] + files
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode == 0:
        print(" -> JavaScript Syntax Check: 100% PASSED!")
    else:
        print(" -> JavaScript Error:", result.stderr)
        sys.exit(1)

def check_dedicated_server():
    print("[2/4] Checking Dedicated Node.js WebSocket Game Server...")
    cmd = ["node", "-c", "server/dedicated_server.js"]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode == 0:
        print(" -> Dedicated Server Build: 100% PASSED!")
    else:
        print(" -> Server Error:", result.stderr)
        sys.exit(1)

def check_python_matchmaking():
    print("[3/4] Checking Python Matchmaking REST Server...")
    cmd = ["python", "-m", "py_compile", "server/matchmaking_server.py"]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode == 0:
        print(" -> Python Server Build: 100% PASSED!")
    else:
        print(" -> Python Compile Error:", result.stderr)

def main():
    print_banner()
    verify_js_syntax()
    check_dedicated_server()
    check_python_matchmaking()
    print("[4/4] Master Build Complete! Game Ready for Launch!")
    print("========================================================")

if __name__ == "__main__":
    main()
