#!/bin/sh

npm install
cd client; npm install
npm run build
cd ..