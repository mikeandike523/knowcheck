#!/bin/bash

dn="$(dirname "$(realpath "${BASH_SOURCE[0]}")")"

cd "$dn"

mousebox_project="$(realpath "$dn/../mousebox")"
svg_designer_project="$(realpath "$dn/../svg-designer")"

cd frontend
yarn remove mousebox
yarn remove svg-designer
yarn add "$mousebox_project"
yarn add "$svg_designer_project"
cd ..

cd backend
yarn remove mousebox
yarn remove svg-designer
yarn add "$mousebox_project"
yarn add "$svg_designer_project"
cd ..

