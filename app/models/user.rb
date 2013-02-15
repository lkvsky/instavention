class User < ActiveRecord::Base
  attr_accessible :access_token, :instagram_id, :instagram_username, :instagram_profile

  has_many :photos
end