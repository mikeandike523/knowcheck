#!/bin/bash

dn="$(dirname "$(realpath "${BASH_SOURCE[0]}")")"

cd "$dn"

mousebox_project="$(realpath "$dn/../mousebox")"
svg_designer_project="$(realpath "$dn/../svg-designer")"

cd frontend
pnpm link "$mousebox_project"
pnpm link "$svg_designer_project"

cd ..

cd backend
cd functions
pnpm link "$mousebox_project"
pnpm link "$svg_designer_project"
