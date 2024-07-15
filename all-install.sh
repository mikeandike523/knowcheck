#!/bin/bash

rm -rf node_modules && pnpm install

cd frontend
rm -rf node_modules && pnpm install

cd ..
cd backend
rm -rf node_modules && pnpm install

cd seed-data
rm -rf node_modules && pnpm install

cd ..
cd functions
rm -rf node_modules && pnpm install

cd ..
cd ..