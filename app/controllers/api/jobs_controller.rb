class Api::JobsController < ApplicationController
    def index
        render json: "Captain Alvarado's Handyman Yelp Reviews Controller"
    end

    # def pull_yelp_cache
    #     puts "Started Yelp cache pull for Captain Alvarado's Handyman in Long Beach, CA"
    #     reviews = YelpCached.cached_yelp_reviews
    #     puts "Fetched Yelp reviews: #{reviews}"
    #     render json: reviews
    # rescue StandardError => e
    #     puts "Error in pull_yelp_cache: #{e.message}"
    #     render json: { "error": e.message }, status: :internal_server_error
    # end

    # require 'redis'
    # require 'json'
    # require 'uri'
    # require 'net/http'

    # class YelpCached
    #     def self.remove_user_by_name(users, name)
    #         puts "Removing user by name: #{name}"
    #         users.reject! { |user| user['user']['name'] == name }
    #         puts "User removed successfully" if users.none? { |user| user['user']['name'] == name }
    #     end

    #     def self.cached_yelp_reviews
    #         puts "Connecting to Redis"
    #         redis = Redis.new(
    #             url: ENV['REDIS_URL'],
    #             ssl_params: { verify_mode: OpenSSL::SSL::VERIFY_NONE }
    #         )

    #         puts "Attempting to retrieve cached data"
    #         cached_data = redis.get('cached_yelp_reviews')
    #         if cached_data.present?
    #             puts "Cached data found"
    #             reviews = JSON.parse(cached_data)
    #             if reviews.empty?
    #                 puts "Cached data is empty, need to fetch fresh data"
    #             else
    #                 puts "Returning non-empty cached data"
    #                 remove_user_by_name(reviews, 'Pdub ..')
    #                 return JSON.generate(reviews)
    #             end
    #         else
    #             puts "No cached data found, fetching new data"
    #         end

    #         # Fetch data from Yelp if no valid cache is found
    #         businesses = [
    #             { alias: "bcb-carts-long-beach", location: "Long Beach, CA" },
    #             { alias: "bcb-carts", location: "Long Beach, CA" },
    #         ]
    #         puts "Defined businesses for review fetch: #{businesses}"

    #         http = Net::HTTP.new("api.yelp.com", 443)
    #         http.use_ssl = true
    #         reviews = []

    #         businesses.each do |business|
    #             puts "Processing business: #{business[:alias]}"
    #             business_url = URI("https://api.yelp.com/v3/businesses/#{business[:alias]}")
    #             puts "Request URL for business info: #{business_url}"

    #             business_request = Net::HTTP::Get.new(business_url)
    #             business_request["Authorization"] = "Bearer #{ENV['REACT_YELP_API_KEY']}"
    #             business_response = http.request(business_request)
    #             business_parsed_response = JSON.parse(business_response.body)
    #             puts "Business response received: #{business_parsed_response}"

    #             if business_parsed_response["error"]
    #                 puts "Error in business details response: #{business_parsed_response['error']['description']}"
    #                 next
    #             end

    #             url = URI("https://api.yelp.com/v3/businesses/#{business[:alias]}/reviews")
    #             puts "Request URL for reviews: #{url}"

    #             request = Net::HTTP::Get.new(url)
    #             request["Authorization"] = "Bearer #{ENV['REACT_YELP_API_KEY']}"
    #             response = http.request(request)
    #             parsed_response = JSON.parse(response.body)
    #             puts "Review response received: #{parsed_response}"

    #             if parsed_response["error"]
    #                 puts "Error in reviews response: #{parsed_response['error']['description']}"
    #                 next
    #             end

    #             parsed_reviews = parsed_response["reviews"]
    #             puts "Parsed reviews: #{parsed_reviews}"

    #             parsed_reviews.each do |review|
    #                 puts "Processing review ID: #{review['id']}"
    #                 review["text"] = review["text"].strip
    #             end

    #             limited_reviews = parsed_reviews.take(3)
    #             puts "Limited to top 3 reviews: #{limited_reviews}"

    #             limited_reviews.each do |review|
    #                 if review["rating"] == 5 && !reviews.any? { |r| r["id"] == review["id"] }
    #                     puts "Adding 5-star review ID: #{review['id']}"
    #                     reviews << review
    #                 end
    #             end
    #         end

    #         if reviews.any?
    #             puts "Caching new reviews"
    #             redis.set("cached_yelp_reviews", JSON.generate(reviews))
    #             redis.expire("cached_yelp_reviews", 30.days.to_i)
    #             puts "New reviews cached successfully"
    #         else
    #             puts "No new 5-star reviews found to cache"
    #         end

    #         reviews = JSON.parse(redis.get("cached_yelp_reviews")) || []
    #         if reviews.present?
    #             puts "Returning cached reviews after fresh fetch"
    #             remove_user_by_name(reviews, 'Pdub ..')
    #             return JSON.generate(reviews)
    #         else
    #             puts "Returning empty review set"
    #             { reviews: "No reviews available" }
    #         end
    #     rescue StandardError => e
    #         puts "Error in cached_yelp_reviews: #{e.message}"
    #         { "error": e.message }
    #     end
    # end
end
