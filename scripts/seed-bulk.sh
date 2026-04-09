#!/bin/bash
# Bulk seed Wikipedia articles to reach 100K target
# Usage: ./scripts/seed-bulk.sh [wave_number]

BASE_URL="https://gptwiki.net"
SECRET="zjzph7C00Rp5GhquwZBdAqh0hnBXajOPPyPECue2D3w="
WAVE=${1:-1}

echo "=== Wave $WAVE: Bulk Wikipedia Seeding ==="
echo "Target: 100,000 total articles"
echo ""

# Function to seed a language with given params
seed() {
  local lang=$1
  local count=$2
  local mode=$3
  local offset=$4
  local label=$5

  echo "[Wave $WAVE] Seeding $lang ($label): count=$count mode=$mode offset=$offset"
  curl -s -X POST "$BASE_URL/api/seed/wikipedia?secret=$SECRET" \
    -H "Content-Type: application/json" \
    -d "{\"lang\":\"$lang\",\"count\":$count,\"mode\":\"$mode\",\"offset\":$offset}" \
    --max-time 300 | python3 -c "import sys,json; d=json.load(sys.stdin); print(f'  -> {d.get(\"language\",\"?\")} stored={d.get(\"stored\",0)} skipped={d.get(\"skipped\",0)}')" 2>/dev/null || echo "  -> Request failed or timed out"
}

# Check current counts first
echo "Current counts:"
curl -s "$BASE_URL/api/seed/wikipedia?secret=$SECRET" | python3 -c "
import sys, json
d = json.load(sys.stdin)
print(f'  Total: {d[\"total\"]}')
for k,v in sorted(d['bySource'].items()):
    if v > 0:
        print(f'  {k}: {v}')
" 2>/dev/null || echo "  Could not fetch counts"
echo ""

case $WAVE in
  1)
    echo "--- Wave 1: English heavy (search mode) ---"
    for i in $(seq 0 4 24); do
      seed "en" 2500 "search" $i "batch-$((i/4+1))" &
      sleep 2
    done
    wait
    echo "Wave 1 complete"
    ;;
  2)
    echo "--- Wave 2: Major European languages ---"
    seed "fr" 2500 "search" 0 "batch-1" &
    seed "de" 2500 "search" 0 "batch-1" &
    seed "es" 2500 "search" 0 "batch-1" &
    seed "it" 2500 "search" 0 "batch-1" &
    seed "pt" 2500 "search" 0 "batch-1" &
    wait
    seed "fr" 2500 "search" 10 "batch-2" &
    seed "de" 2500 "search" 10 "batch-2" &
    seed "es" 2500 "search" 10 "batch-2" &
    seed "it" 2500 "search" 10 "batch-2" &
    seed "pt" 2500 "search" 10 "batch-2" &
    wait
    echo "Wave 2 complete"
    ;;
  3)
    echo "--- Wave 3: Asian languages ---"
    seed "zh" 2500 "search" 0 "batch-1" &
    seed "ja" 2500 "search" 0 "batch-1" &
    seed "ko" 2500 "search" 0 "batch-1" &
    seed "vi" 2500 "search" 0 "batch-1" &
    seed "th" 2500 "search" 0 "batch-1" &
    wait
    seed "zh" 2500 "search" 10 "batch-2" &
    seed "ja" 2500 "search" 10 "batch-2" &
    seed "ko" 2500 "search" 10 "batch-2" &
    seed "hi" 2500 "search" 0 "batch-1" &
    seed "ar" 2500 "search" 0 "batch-1" &
    wait
    echo "Wave 3 complete"
    ;;
  4)
    echo "--- Wave 4: More English + remaining ---"
    for i in $(seq 0 4 24); do
      seed "en" 2500 "mixed" $((i+26)) "batch-$((i/4+1))" &
      sleep 2
    done
    wait
    echo "Wave 4 complete"
    ;;
  5)
    echo "--- Wave 5: Fill gaps across all languages ---"
    seed "en" 3000 "random" 0 "random-1" &
    seed "zh" 2500 "mixed" 20 "mixed-1" &
    seed "ja" 2500 "mixed" 20 "mixed-1" &
    seed "ru" 2500 "search" 0 "batch-1" &
    seed "tr" 2500 "search" 0 "batch-1" &
    wait
    seed "en" 3000 "random" 0 "random-2" &
    seed "fr" 2500 "mixed" 20 "mixed-1" &
    seed "de" 2500 "mixed" 20 "mixed-1" &
    seed "es" 2500 "mixed" 20 "mixed-1" &
    seed "ar" 2500 "search" 10 "batch-2" &
    wait
    echo "Wave 5 complete"
    ;;
  *)
    echo "Unknown wave: $WAVE. Use 1-5."
    exit 1
    ;;
esac

echo ""
echo "=== Wave $WAVE finished ==="
echo "Checking final counts..."
curl -s "$BASE_URL/api/seed/wikipedia?secret=$SECRET" | python3 -c "
import sys, json
d = json.load(sys.stdin)
print(f'Total: {d[\"total\"]}')
" 2>/dev/null
