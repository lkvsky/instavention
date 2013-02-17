class User < ActiveRecord::Base
  attr_accessible :access_token, :instagram_id, :instagram_username, :instagram_profile

  has_many :photos

  def has_url?(url)
    return false if photos.empty?
    
    urls = photos.map { |photo| photo.url }
    urls.include?(url)
  end
end