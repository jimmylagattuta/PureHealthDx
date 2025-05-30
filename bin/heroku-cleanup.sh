#!/bin/sh

echo "🔥 cleanup-before-slug.sh: aggressively stripping slug bloat"

# Remove leftover Node stuff
[ -d client/node_modules ] && rm -rf client/node_modules && echo "🗑 Removed client/node_modules"
[ -f client/package-lock.json ] && rm -f client/package-lock.json && echo "🗑 Removed client/package-lock.json"

# Kill Ruby + binary bloat
[ -d vendor/bundle ] && rm -rf vendor/bundle && echo "🗑 Removed vendor/bundle"
[ -d vendor/ruby-3.1.2 ] && rm -rf vendor/ruby-3.1.2 && echo "🗑 Removed vendor/ruby-3.1.2"
[ -f bin/node ] && rm -f bin/node && echo "🗑 Removed bin/node"
[ -f bin/node.exe ] && rm -f bin/node.exe && echo "🗑 Removed bin/node.exe"

echo "🏁 cleanup-before-slug.sh complete"