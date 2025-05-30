#!/bin/sh

echo "🔥 cleanup-before-slug.sh: aggressively stripping slug bloat"

rm -rf client/node_modules
rm -rf client/build
rm -rf node_modules
rm -rf tmp/cache
rm -rf vendor/bundle
rm -rf vendor/ruby*

echo "✅ cleanup-before-slug.sh done"