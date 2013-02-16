class PhotosController < ApplicationController
  def index
    @user = User.find_by_access_token(session[:access_token])

    respond_to do |format|
      format.html do
        if @user.nil?
          redirect_to root_path
        else
          render :index
        end
      end
      format.json { render :json => @user.photos }
    end
  end

  def new
    @user = User.find_by_access_token(session[:access_token])
    redirect_to root_path if @user.nil?

    if @user.access_token == "guest"
      photos = Instagram.media_popular
    else
      photos = Instagram.user_media_feed(:access_token => session[:access_token],
                                         :count => 25).data
    end

    photos.each do |photo|
        @user.photos.create(:url => photo.images.low_resolution.url,
                      :caption => photo.caption,
                      :byline => photo.user.username,
                      :game_match => 0,
                      :game_bomb => 0)
    end

    redirect_to photos_path
  end
end
