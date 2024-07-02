#!/bin/bash

dn="$(dirname "$(realpath "${BASH_SOURCE[0]}")")"

cd "$dn"

echo "$dn"

rm  backend/functions/utils
rm  frontend/src/utils

rm  backend/functions/common
rm  frontend/src/common

ln -s "$dn/utils" "$dn/backend/functions/utils"
ln -s "$dn/utils" "$dn/frontend/src/utils"

ln -s "$dn/common" "$dn/backend/functions/common"
ln -s "$dn/common" "$dn/frontend/src/common"
