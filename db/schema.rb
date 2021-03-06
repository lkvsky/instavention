# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130215165156) do

  create_table "photos", :force => true do |t|
    t.string   "url"
    t.integer  "game_match"
    t.integer  "game_bomb"
    t.integer  "user_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string   "byline"
    t.string   "caption"
  end

  add_index "photos", ["url"], :name => "index_photos_on_url"
  add_index "photos", ["user_id"], :name => "index_photos_on_user_id"

  create_table "users", :force => true do |t|
    t.string   "access_token"
    t.integer  "instagram_id"
    t.string   "instagram_username"
    t.string   "instagram_profile"
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
  end

  add_index "users", ["access_token"], :name => "index_users_on_access_token"
  add_index "users", ["instagram_id"], :name => "index_users_on_instagram_id"

end
