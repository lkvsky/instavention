class User < ActiveRecord::Base
  has_many :photos

  def photo_urls
    photos.map { |photo| photo = photo.url }
  end
end