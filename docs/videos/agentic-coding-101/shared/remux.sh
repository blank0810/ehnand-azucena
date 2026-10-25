#!/usr/bin/env bash
# Swaps a delivered clip's soundtrack for the current assets/vo/mix.wav, keeping
# the rendered picture as it is (no re-render): for audio-only fixes.
#   bash ../shared/remux.sh       (run from the clip folder; rewrites ../out/<clip>.mp4)
set -euo pipefail
clip=$(basename "$PWD")
src=../out/$clip.mp4
tmp=$(mktemp --suffix=.mp4)
ffmpeg -v error -y -i "$src" -i assets/vo/mix.wav -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 128k -ar 48000 -shortest -movflags +faststart "$tmp"
mv "$tmp" "$src"
lufs=$(ffmpeg -hide_banner -i "$src" -af loudnorm=I=-16:TP=-1.5:LRA=11:print_format=summary -f null - 2>&1 | awk '/Input Integrated/ {print $3}')
echo "$clip: soundtrack replaced, ${lufs} LUFS"
