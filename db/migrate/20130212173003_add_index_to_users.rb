class AddIndexToUsers < ActiveRecord::Migration
  def change
    add_index :users, :access_token
    add_index :users, :instagram_id
  end
end
