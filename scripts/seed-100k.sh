#!/bin/bash
# Reliable bulk seeding - 1000 per request, 2 parallel, 20s gaps

BASE_URL="https://gptwiki.net"
SECRET="zjzph7C00Rp5GhquwZBdAqh0hnBXajOPPyPECue2D3w="

seed() {
  local lang=$1
  local count=$2
  curl -s -X POST "$BASE_URL/api/seed/wikipedia?secret=$SECRET" \
    -H "Content-Type: application/json" \
    -d "{\"lang\":\"$lang\",\"count\":$count,\"mode\":\"random\"}" \
    --max-time 600 2>/dev/null | python3 -c "import sys,json; d=json.load(sys.stdin); print(f'  {d[\"language\"]} +{d[\"stored\"]}')" 2>/dev/null || echo "  $lang failed"
}

get_total() {
  curl -s "$BASE_URL/api/seed/wikipedia?secret=$SECRET" 2>/dev/null | python3 -c "import sys,json; print(json.load(sys.stdin)['total'])" 2>/dev/null || echo "?"
}

echo "=== Reliable Bulk Seeding ==="
echo "Start: $(get_total)"

LANGS="en zh ja ko es fr de pt ru it ar hi tr vi th"
ROUND=1

while true; do
  TOTAL=$(get_total)
  echo ""
  echo "--- Round $ROUND (total=$TOTAL) ---"

  if [ "$TOTAL" != "?" ] && [ "$TOTAL" -ge 100000 ] 2>/dev/null; then
    echo "Target reached!"
    break
  fi

  for lang in $LANGS; do
    seed "$lang" 1000 &

    # Every 2 languages, wait for completion
    if [ $(($(echo $LANGS | tr ' ' '\n' | grep -n "^${lang}$" | cut -d: -f1) % 2)) -eq 0 ]; then
      wait
      sleep 15
    fi
  done
  wait
  sleep 10

  ROUND=$((ROUND + 1))

  # Safety: max 10 rounds
  if [ "$ROUND" -gt 10 ]; then
    echo "Max rounds reached"
    break
  fi
done

echo ""
echo "=== DONE ==="
echo "Final: $(get_total)"
