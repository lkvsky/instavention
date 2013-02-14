class Photo < ActiveRecord::Base
  attr_accessible :user_id, :url, :game_match, :game_bomb

  belongs_to :user

  def self.delete_by_user(user)
    Photo.delete(Photo.where(:user_id => user))
  end
end