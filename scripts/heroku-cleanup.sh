#!/bin/sh

echo "🔥 cleanup-before-slug.sh: aggressively stripping slug bloat"

# Remove Node modules and lock files
[ -d client/node_modules ] && rm -rf client/node_modules && echo "🗑 Removed client/node_modules"
[ -f package-lock.json ] && rm -f package-lock.json && echo "🗑 Removed package-lock.json"
[ -f yarn.lock ] && rm -f yarn.lock && echo "🗑 Removed yarn.lock"

# Remove Ruby/vendor bloat
[ -d vendor/bundle ] && rm -rf vendor/bundle && echo "🗑 Removed vendor/bundle"
[ -d vendor/ruby-* ] && rm -rf vendor/ruby-* && echo "🗑 Removed vendor/ruby-*"

# Remove bin folder
[ -d bin ] && rm -rf bin && echo "🗑 Removed bin"

# Remove test and log assets
[ -d test ] && rm -rf test && echo "🗑 Removed test"
[ -d log ] && rm -rf log && echo "🗑 Removed log"

# Clear compiled assets if applicable
[ -d tmp/cache ] && rm -rf tmp/cache && echo "🗑 Removed tmp/cache"

echo "🏁 cleanup-before-slug.sh complete"
