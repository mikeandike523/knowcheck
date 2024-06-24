#!/bin/bash

dn="$(dirname "$(realpath "${BASH_SOURCE[0]}")")"

cd "$dn"

rm -rf backend/utils
rm -rf backend/src/utils

rm -rf backend/common
rm -rf frontend/src/common


ln -s "$dn/utils" "$dn/backend/utils"
ln -s "$dn/utils" "$dn/frontend/src/utils"

ln -s "$dn/common" "$dn/backend/common"
ln -s "$dn/common" "$dn/frontend/src/common"

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

