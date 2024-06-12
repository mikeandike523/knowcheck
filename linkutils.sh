#!/bin/bash

rm -f backend/utils
rm -f frontend/utils

ln -s "$(pwd)/utils" "$(pwd)/backend/utils"
ln -s "$(pwd)/utils" "$(pwd)/frontend/src/utils"