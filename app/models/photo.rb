class Photo < ActiveRecord::Base
  attr_accessible :user_id, :url, :game_match, :game_bomb

  belongs_to :user
end