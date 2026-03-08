#!/bin/sh
# ─────────────────────────────────────────────────────────────
#  TORANA CREATIVES — Start Script
#  Starts Vite dev server + ngrok tunnel on port 5173
#  Usage:  sh start.sh
#          sh start.sh --url=your-static.ngrok-free.app
# ─────────────────────────────────────────────────────────────

PORT=5173
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
NGROK_URL_FLAG=""

# Accept optional static domain argument: --url=your-domain.ngrok-free.app
for arg in "$@"; do
  case $arg in
    --url=*) NGROK_URL_FLAG="--url=${arg#*=}" ;;
  esac
done

echo ""
echo "🪔  Torana (ತೋರಣ) Creatives — Starting..."
echo "──────────────────────────────────────────"

# Kill any leftover Vite or ngrok processes
pkill -f "vite" 2>/dev/null
pkill -f "ngrok" 2>/dev/null
sleep 1

# Start Vite in the background
echo "▶  Starting Vite on port $PORT..."
cd "$PROJECT_DIR"
npx --no-install vite --host --port $PORT > /tmp/torana-vite.log 2>&1 &
VITE_PID=$!

# Wait for Vite to be ready
sleep 3

if ! kill -0 $VITE_PID 2>/dev/null; then
  echo "❌  Vite failed to start. Check /tmp/torana-vite.log"
  exit 1
fi
echo "✅  Vite running (PID $VITE_PID)"

# Start ngrok
echo "▶  Starting ngrok tunnel..."
if [ -n "$NGROK_URL_FLAG" ]; then
  ngrok http $NGROK_URL_FLAG $PORT > /tmp/torana-ngrok.log 2>&1 &
else
  ngrok http $PORT > /tmp/torana-ngrok.log 2>&1 &
fi
NGROK_PID=$!
sleep 3

# Fetch the public URL from ngrok API
PUBLIC_URL=$(curl -s http://localhost:4040/api/tunnels 2>/dev/null \
  | python3 -c "import sys,json; t=json.load(sys.stdin)['tunnels']; print(next((x['public_url'] for x in t if x['public_url'].startswith('https')), t[0]['public_url'] if t else ''))" 2>/dev/null)

echo ""
echo "══════════════════════════════════════════"
echo "  🌐  Live URL : $PUBLIC_URL"
echo "  💻  Local    : http://localhost:$PORT"
echo "══════════════════════════════════════════"
echo ""

if [ -n "$NGROK_URL_FLAG" ]; then
  echo "  ✅  Static domain active — GoDaddy CNAME points here permanently."
else
  echo "  ⚠️   Free ngrok URL — changes on every restart."
  echo "  💡  Get a free static domain at dashboard.ngrok.com → Domains"
  echo "  💡  Then run:  sh start.sh --url=your-domain.ngrok-free.app"
fi

echo ""
echo "  Press Ctrl+C to stop everything."
echo ""

# Trap Ctrl+C to cleanly kill both processes
trap 'echo ""; echo "Stopping..."; kill $VITE_PID $NGROK_PID 2>/dev/null; exit 0' INT

# Keep script alive
wait $VITE_PID
