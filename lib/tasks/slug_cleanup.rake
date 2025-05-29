# lib/tasks/slug_cleanup.rake

namespace :slug do
  desc "Remove vendor/bundle to trim slug size"
  task cleanup: :environment do
    path = Rails.root.join("vendor","bundle")
    if File.exist?(path)
      puts "→ Deleting #{path} to slim slug..."
      FileUtils.rm_rf(path)
    end
  end
end

# After assets:precompile runs, invoke our cleanup
Rake::Task["assets:precompile"].enhance do
  Rake::Task["slug:cleanup"].invoke
end