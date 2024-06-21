#!/bin/bash

dn="$(dirname "$(realpath "${BASH_SOURCE[0]}")")"

rm -rf backend/utils
rm -rf backend/src/utils

rm -rf backend/common
rm -rf frontend/src/common


ln -s "$dn/utils" "$dn/backend/utils"
ln -s "$dn/utils" "$dn/frontend/src/utils"

ln -s "$dn/common" "$dn/backend/common"
ln -s "$dn/common" "$dn/frontend/src/common"