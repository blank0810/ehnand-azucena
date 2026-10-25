#!/usr/bin/env bash
# Contact sheet of each scene's midpoint and its last moment before the cut.
#   bash ../shared/snap.sh        (run from the clip folder) -> .hyperframes/snap/contact-sheet*.jpg
set -euo pipefail
times=$(node -e 'const t=require("./timing.json"); console.log(Object.values(t.scenes).flatMap(([s,e])=>[((s+e)/2).toFixed(2),(e-0.5).toFixed(2)]).join(","))')
rm -rf .hyperframes/snap
npx --yes hyperframes@0.8.192 snapshot --at "$times" -o .hyperframes/snap --describe false --no-end >/dev/null 2>&1
ls .hyperframes/snap/contact-sheet*.jpg
