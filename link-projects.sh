#!/bin/bash

dn="$(dirname "$(realpath "${BASH_SOURCE[0]}")")"

cd "$dn"

mousebox_project="$(realpath "$dn/../mousebox")"
svg_designer_project="$(realpath "$dn/../svg-designer")"

cd frontend
pnpm remove svg-designer
pnpm add "$svg_designer_project"

A="$(realpath "./node_modules/react")"
B="$(realpath "./node_modules/svg-designer/node_modules/react")"

echo "$A"
echo "$B"

rm -rf "$A" 
ln -s "$B" "$A"

# file "$A"
# file "$B"