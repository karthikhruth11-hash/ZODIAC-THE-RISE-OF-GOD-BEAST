# ==============================================================================
# ZODIAC: RISE OF THE GOD BEAST — PYTHON MATCHMAKING & AI ANALYTICS REST SERVER
# Language: Python 3.10+
# ==============================================================================

import time
import json
import math
from http.server import HTTPServer, BaseHTTPRequestHandler

SERVER_PORT = 8080

class ZodiacMatchmakingHandler(BaseHTTPRequestHandler):
    def _set_headers(self, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers(200)

    def do_GET(self):
        self._set_headers(200)
        if self.path == '/api/v1/status':
            response = {
                "server": "ZODIAC Python Matchmaking & AI Analytics API",
                "status": "ONLINE",
                "uptime": time.time(),
                "active_matchmaking_queues": 3,
                "ai_director_difficulty_tier": "ADAPTIVE_DYNAMIC"
            }
        elif self.path == '/api/v1/leaderboard':
            response = {
                "top_players": [
                    {"rank": 1, "name": "Kaelen_Vance_01", "level": 200, "path": "Physical", "dragon_kills": 42},
                    {"rank": 2, "name": "Arcana_Master_X", "level": 185, "path": "Arcana", "dragon_kills": 38},
                    {"rank": 3, "name": "Titan_Overlord", "level": 170, "path": "Physical", "dragon_kills": 29},
                    {"rank": 4, "name": "Elemental_Storm", "level": 150, "path": "Elemental", "dragon_kills": 24}
                ]
            }
        else:
            response = {"message": "ZODIAC API Endpoint Ready", "timestamp": time.time()}

        self.wfile.write(json.dumps(response).encode('utf-8'))

    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length)
        self._set_headers(200)
        
        try:
            payload = json.loads(post_data.decode('utf-8')) if post_data else {}
        except Exception:
            payload = {}

        response = {
            "result": "SUCCESS",
            "match_id": "MATCH_" + str(int(time.time())),
            "assigned_server": "ws://127.0.0.1:3001",
            "received_payload": payload
        }
        self.wfile.write(json.dumps(response).encode('utf-8'))

def run_matchmaking_server():
    server_address = ('', SERVER_PORT)
    httpd = HTTPServer(server_address, ZodiacMatchmakingHandler)
    print(f"[PYTHON SERVER] ZODIAC Matchmaking & Analytics Service running on port {SERVER_PORT}...")
    httpd.serve_forever()

if __name__ == '__main__':
    run_matchmaking_server()
