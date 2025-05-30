#!/bin/sh

echo "🔥 heroku-postbuild: stripping slug bloat"

rm -rf client
rm -rf node_modules
rm -rf vendor/ruby-3.1.2
rm -rf vendor/bundle
rm -f bin/node
rm -f bin/node.exe

echo "✅ Done cleaning up slug garbage."