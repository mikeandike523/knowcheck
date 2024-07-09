#!/bin/bash

dn="$(dirname "$(realpath "${BASH_SOURCE[0]}")")"

cd "$dn"

echo "$dn"

rm  -rf backend/functions/utils
rm  -rf frontend/src/utils

rm  -rf backend/functions/common
rm  -rf frontend/src/common

ln -s "$dn/utils" "$dn/backend/functions/utils"
ln -s "$dn/utils" "$dn/frontend/src/utils"

ln -s "$dn/common" "$dn/backend/functions/common"
ln -s "$dn/common" "$dn/frontend/src/common"
