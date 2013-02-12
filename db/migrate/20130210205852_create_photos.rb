class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.string :url
      t.integer :game_match
      t.integer :game_bomb
      t.integer :user_id

      t.timestamps
    end
  end
end
