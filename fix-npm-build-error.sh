#!/bin/bash

# Check Node and npm versions
node -v
npm -v

# Clear npm cache
npm cache clean --force

# Reinstall node modules
rm -rf node_modules
npm install

# Run npm build
npm run build
