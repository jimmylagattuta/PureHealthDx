#!/bin/sh

echo "🔥 cleanup-before-slug.sh: stripping slug bloat"

rm -rf node_modules
rm -rf client
rm -rf tmp/cache
rm -rf log
rm -rf test
rm -rf spec
rm -rf vendor/bundle
rm -rf vendor/ruby*

echo "✅ cleanup-before-slug.sh done"