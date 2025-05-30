#!/bin/sh

echo "🔥 Running custom release script: cleaning large files..."

rm -rf client
rm -rf node_modules
rm -f bin/node
rm -f bin/node.exe
rm -rf vendor/ruby-3.1.2
rm -rf vendor/bundle

echo "✅ Cleanup complete. Running DB migrations..."
bundle exec rake db:migrate