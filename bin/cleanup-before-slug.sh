#!/bin/sh

echo "🔥 cleanup-before-slug.sh: aggressively stripping slug bloat"

check_and_delete() {
  if [ -d "$1" ]; then
    echo "🧹 Found $1, deleting..."
    rm -rf "$1"
    if [ -d "$1" ]; then
      echo "❌ Failed to delete $1"
    else
      echo "✅ Deleted $1"
    fi
  else
    echo "ℹ️  $1 does not exist, skipping."
  fi
}

check_and_delete client/node_modules/heroku-deploy
check_and_delete client/node_modules/react-icons
check_and_delete client/node_modules/@testing-library
check_and_delete client/node_modules/jest-environment-jsdom

echo "🏁 cleanup-before-slug.sh complete"