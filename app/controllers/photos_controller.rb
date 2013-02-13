class PhotosController < ApplicationController
  def index
    @user = User.find_by_access_token(session[:access_token])
    redirect_to root_path if @user.nil?

    respond_to do |format|
      format.html { render :index }
      format.json { render :json => @user.photos }
    end
  end

  def new
    @user = User.find_by_access_token(session[:access_token])
    redirect_to root_path if @user.nil?

    photos = Instagram.user_media_feed(:access_token => session[:access_token],
                                         :count => 40).data

    photos.each do |photo|
      unless @user.photo_urls.include?(photo.images.low_resolution.url)
        @user.photos.create(:url => photo.images.low_resolution.url,
                      :game_match => 0,
                      :game_bomb => 0)
      end
    end

    redirect_to photos_path
  end
end
