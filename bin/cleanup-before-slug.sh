#!/bin/sh

echo "🔥 heroku-postbuild: aggressively stripping slug bloat"

# Kill heavy frontend & Ruby build remnants
rm -rf client
rm -rf node_modules
rm -rf vendor/bundle
rm -rf vendor/ruby*
rm -rf tmp/cache
rm -rf log
rm -rf test
rm -rf spec

# Kill prebuilt bins if present
rm -f bin/node
rm -f bin/node.exe
rm -f bin/yarn
rm -f bin/webpack

# If your app has assets or webpacker:
rm -rf public/assets
rm -rf public/packs
rm -rf public/packs-test

echo "✅ Cleanup done."