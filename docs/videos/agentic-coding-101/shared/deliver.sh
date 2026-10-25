#!/usr/bin/env bash
# Renders a clip and writes the three files the site ships, into ../out/:
#   <clip>.mp4   h264 High, CRF 22, +faststart; AAC 128k from the -16 LUFS mix
#   <clip>.vtt   captions from voice.mjs
#   <clip>.webp  poster: the last moment of scene 1, where the whole idea is on screen
#
#   bash ../shared/deliver.sh            (run from the clip folder, after check passes)
set -euo pipefail
clip=$(basename "$PWD")
out=../out
mkdir -p build "$out"
npx --yes hyperframes@0.8.192 render -o "build/$clip-master.mp4" --fps 30 --quality looks --strict --quiet >/dev/null
ffmpeg -v error -y -i "build/$clip-master.mp4" -i assets/vo/mix.wav -map 0:v:0 -map 1:a:0 \
  -c:v libx264 -preset slow -crf 22 -tune animation -pix_fmt yuv420p -profile:v high \
  -c:a aac -b:a 128k -ar 48000 -shortest -movflags +faststart "$out/$clip.mp4"
cp captions.vtt "$out/$clip.vtt"
poster=$(node -e 'const t=require("./timing.json"); console.log((t.scenes.what[1]-0.6).toFixed(2))')
ffmpeg -v error -y -ss "$poster" -i "build/$clip-master.mp4" -frames:v 1 -c:v libwebp -quality 82 "$out/$clip.webp"
size=$(stat -c %s "$out/$clip.mp4")
lufs=$(ffmpeg -hide_banner -i "$out/$clip.mp4" -af loudnorm=I=-16:TP=-1.5:LRA=11:print_format=summary -f null - 2>&1 | awk '/Input Integrated/ {print $3}')
dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$out/$clip.mp4")
echo "$clip: ${dur}s, $((size / 1024)) KB, ${lufs} LUFS, poster at ${poster}s"
