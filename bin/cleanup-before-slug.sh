#!/bin/sh

echo "🔥 cleanup-before-slug.sh: aggressively stripping slug bloat"

# Delete heavy node_modules dependencies
rm -rf client/node_modules/heroku-deploy
rm -rf client/node_modules/react-icons
rm -rf client/node_modules/@testing-library
rm -rf client/node_modules/jest-environment-jsdom

echo "✅ cleanup-before-slug.sh done"