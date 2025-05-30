#!/bin/sh

echo "🔥 cleanup-before-slug.sh: aggressively stripping slug bloat"
# Remove leftover Node stuff
[ -d client/node_modules ] && rm -rf client/node_modules && echo "🗑 Removed client/node_modules"
[ -f package-lock.json ] && rm -f package-lock.json && echo "🗑 Removed package-lock.json"

# Kill Ruby + binary bloat
[ -d vendor/bundle ] && rm -rf vendor/bundle && echo "🗑 Removed vendor/bundle"
[ -d vendor/ruby-3.1.2 ] && rm -rf vendor/ruby-3.1.2 && echo "🗑 Removed vendor/ruby-3.1.2"
[ -f bin/node ] && rm -f bin/node && echo "🗑 Removed bin/node"
[ -f bin/node.exe ] && rm -f bin/node.exe && echo "🗑 Removed bin/node.exe"
[ -d bin ] && rm -rf bin && echo "🗑 Removed bin"

echo "🏁 cleanup-before-slug.sh complete"