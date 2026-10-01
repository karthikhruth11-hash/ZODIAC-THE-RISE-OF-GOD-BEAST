# ==============================================================================
# ZODIAC: RISE OF THE GOD BEAST — POWERSHELL SERVER DEPLOYMENT SCRIPT
# Language: PowerShell
# ==============================================================================

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "ZODIAC: RISE OF THE GOD BEAST — DEPLOYMENT PIPELINE" -ForegroundColor Gold
Write-Host "========================================================" -ForegroundColor Cyan

$WorkspacePath = "c:\Users\karthik\OneDrive\Desktop\pro game"
Set-Location -Path $WorkspacePath

Write-Host "[1/3] Verifying JavaScript Files Syntax..." -ForegroundColor Green
node -c js/three-engine.js js/network-client.js js/i18n.js js/app.js js/test-suite.js js/audio.js js/save-system.js

Write-Host "[2/3] Checking Dedicated WebSocket Server..." -ForegroundColor Green
node -c server/dedicated_server.js

Write-Host "[3/3] Launching Python Build Automation..." -ForegroundColor Green
python scripts/build_all.py

Write-Host "ZODIAC Game Deployment Complete!" -ForegroundColor Cyan
