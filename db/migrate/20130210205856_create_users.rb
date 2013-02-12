class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :access_token
      t.integer :instagram_id
      t.string :instagram_username
      t.string :instagram_profile

      t.timestamps
    end
  end
end
