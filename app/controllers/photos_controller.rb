class PhotosController < ApplicationController
  def index
    @user = User.find_by_access_token(session[:access_token])
    redirect_to root_path if @user.nil?

    respond_to do |format|
      format.html
      format.json { render :json => @user.photos }
    end
  end

  def new
    @user = User.find_by_access_token(session[:access_token])
    redirect_to root_path if @user.nil?

    photos = Instagram.user_recent_media(:access_token => session[:access_token], :count => 40)

    photos.each do |photo|
      unless Photo.find_by_url(photo.images.low_resolution.url)
        Photo.create!(:user_id => @user.id, :url => photo.images.low_resolution.url, :game_match => 0, :game_bomb => 0)
      end
    end

    redirect_to photos_path
  end
end
