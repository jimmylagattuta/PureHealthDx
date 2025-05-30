#!/bin/sh

echo "🔥 heroku-postbuild: aggressively stripping slug bloat"

rm -rf client
rm -rf node_modules
rm -rf vendor/bundle
rm -rf vendor/ruby-3.1.2
rm -rf tmp/cache
rm -rf log/*
rm -rf test

rm -f bin/node
rm -f bin/node.exe

echo "✅ Cleanup done."