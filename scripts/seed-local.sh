#!/bin/bash
# Local seeding - small batches, many sequential calls
# Avoids Wikipedia rate limiting by using smaller requests

BASE_URL="https://gptwiki.net"
SECRET="zjzph7C00Rp5GhquwZBdAqh0hnBXajOPPyPECue2D3w="
BATCH=200  # Small batch per request

seed() {
  local lang=$1
  curl -s -X POST "$BASE_URL/api/seed/wikipedia?secret=$SECRET" \
    -H "Content-Type: application/json" \
    -d "{\"lang\":\"$lang\",\"count\":$BATCH,\"mode\":\"random\"}" \
    --max-time 300 2>/dev/null | python3 -c "import sys,json; d=json.load(sys.stdin); print(f'  {d[\"language\"]} +{d[\"stored\"]}')" 2>/dev/null || echo "  $lang failed"
}

get_total() {
  curl -s "$BASE_URL/api/seed/wikipedia?secret=$SECRET" 2>/dev/null | python3 -c "import sys,json; print(json.load(sys.stdin)['total'])" 2>/dev/null || echo "?"
}

LANGS="en zh ja ko es fr de pt ru it ar hi tr vi th"

echo "=== Small-batch Seeding ==="
TOTAL=$(get_total)
echo "Start: $TOTAL"

ROUND=1
while true; do
  TOTAL=$(get_total)
  if [ "$TOTAL" != "?" ] && [ "$TOTAL" -ge 100000 ] 2>/dev/null; then
    echo "Target 100K reached! Total: $TOTAL"
    break
  fi

  echo "--- Round $ROUND (total=$TOTAL) ---"

  for lang in $LANGS; do
    seed "$lang"
    sleep 3  # 3 second gap between requests
  done

  ROUND=$((ROUND + 1))
  if [ "$ROUND" -gt 20 ]; then
    echo "Max rounds"
    break
  fi
done

echo "Final: $(get_total)"
