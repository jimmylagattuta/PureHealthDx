# lib/middleware/force_www.rb
class ForceWWW
    def initialize(app)
      @app = app
    end
  
    def call(env)
      request = Rack::Request.new(env)
  
      # Debugging statements
      puts "Host: #{request.host}"
      puts "Full URL: #{request.url}"
  
      # Check if the host does not start with 'www'
      if request.host !~ /^www\./
        puts "Redirecting to: #{request.url.sub('//', '//www.')}"
        # Redirect to the same path but with 'www'
        [301, { 'Location' => request.url.sub("//", "//www.") }, []]
      else
        puts "Request already contains 'www'."
        @app.call(env)
      end
    end
  end
  