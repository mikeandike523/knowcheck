#!/bin/bash

dn="$(dirname "$(realpath "${BASH_SOURCE[0]}")")"

rm -rf backend/utils
rm -rf backend/src/utils

rm -f backend/utils
rm -f frontend/src/utils


ln -s "$dn/utils" "$dn/backend/utils"
ln -s "$dn/utils" "$dn/frontend/src/utils"