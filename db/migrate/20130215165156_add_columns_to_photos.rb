class AddColumnsToPhotos < ActiveRecord::Migration
  def change
    add_column :photos, :byline, :string
    add_column :photos, :caption, :string
  end
end
