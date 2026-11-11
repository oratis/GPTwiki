#!/usr/bin/env bash
# Read only. Report configuration coverage without printing endpoint or key values.
set -euo pipefail
project="${1:-gptwiki}"
region="${2:-us-central1}"
gcloud run services describe gptwiki --project="$project" --region="$region" --format=json |
  python3 -c '
import json, sys
service = json.load(sys.stdin)
for target in service["status"]["traffic"]:
    print("traffic", target.get("revisionName"), str(target.get("percent", 0)) + "%")
env = {entry["name"]: entry for entry in service["spec"]["template"]["spec"]["containers"][0].get("env", [])}
def configured(name):
    entry = env.get(name, {})
    return bool(entry.get("value") or entry.get("valueFrom"))
print("latest template search backend:", "Typesense with Firestore fallback" if all(map(configured, ("TYPESENSE_HOST", "TYPESENSE_API_KEY"))) else "Firestore")
'
gcloud compute instances list --project="$project" --filter='name=typesense-1' \
  --format='table(name,zone.basename(),status)'
