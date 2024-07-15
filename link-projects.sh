#!/bin/bash

dn="$(dirname "$(realpath "${BASH_SOURCE[0]}")")"

cd "$dn"

svg_designer_project="$(realpath "$dn/../svg-designer")"
link_name="$dn/frontend/node_modules/svg-designer"

cd frontend
pnpm add "$svg_designer_project"

cd ..

rm -rf "$link_name"
cp -r "$svg_designer_project" "./frontend/node_modules"

A="$dn/frontend/node_modules/svg-designer/node_modules/react"
B="$dn/frontend/node_modules/react"

echo "$A"
echo "$B"

rm -rf "$A" 
ln -s "$B" "$A"