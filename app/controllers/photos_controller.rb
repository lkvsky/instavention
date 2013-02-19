class PhotosController < ApplicationController
  def index
    @user = User.find_by_access_token(session[:access_token])

    if !@user.nil?
      if @user.photos.empty?
        photos = fetch_photos(@user)
      else
        photos = @user.photos
      end

      respond_to do |format|
        format.html { render :index }
        format.json { render :json => photos }
      end

      save_photos(photos)
    else
      redirect_to root_path
    end
  end

  private

    def fetch_photos(user)
      if @user.instagram_username == "Guest"
        photos = Instagram.media_popular
      else
        photos = Instagram.user_media_feed(:access_token => session[:access_token],
                                           :count => 40).data
        if photos.count < 16
          photos = Instagram.media_popular
        end
      end

      photos.map do |photo|
        { :url => photo.images.low_resolution.url,
        :byline => photo.user.username,
        :game_match => 0,
        :game_bomb => 0 }
      end
    end

    def save_photos(photos)
      photos.each do |photo|
        next if @user.has_url?(photo[:url])

        @user.photos.new(photo)
      end

      @user.save
    end
end
