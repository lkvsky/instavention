class UrlIndexToPhotos < ActiveRecord::Migration
  def change
    add_index :photos, :url
    add_index :photos, :user_id
  end
end
