#!/bin/bash

dn="$(dirname "$(realpath "${BASH_SOURCE[0]}")")"

cd "$dn"

svg_designer_project="$(realpath "$dn/../svg-designer")"
link_name="$dn/frontend/node_modules/svg-designer"

# rm -rf "$link_name"
# ln -s "$svg_designer_project" "$link_name"

cd frontend
pnpm remove svg-designer
pnpm add "$svg_designer_project"
cd ..


A="$dn/frontend/node_modules/react"
B="$dn/frontend/node_modules/svg-designer/node_modules/react"

echo "$A"
echo "$B"

rm -rf "$A" 
ln -s "$B" "$A"