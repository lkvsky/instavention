class UsersController < ApplicationController
  def new
    if params[:code]
      response = Instagram.get_access_token(params[:code], :redirect_uri => CALLBACK_URL)
      user = save_user(response)
      
      session[:access_token] = user.access_token
    else
      user = User.new
      user.instagram_username = "Guest"
      user.access_token = "guest"
      user.save!

      session[:access_token] = user.access_token
    end

    redirect_to new_photo_path
  end

  def show
    user = User.find(params[:id])

    respond_to do |format|
      format.json { render :json => user}
    end
  end

  def index
    users = User.all

    respond_to do |format|
      format.json { render :json => users }
    end
  end

  private

    def save_user(response)
      user = User.find_by_instagram_id(response[:user][:id])

      if !user.nil?
        user.access_token = response[:access_token]
        user.instagram_profile = response[:user][:profile_picture]
        user.save!
      else
        user = User.new(:instagram_id => response[:user][:id],
                        :instagram_username => response[:user][:username],
                        :instagram_profile => response[:user][:profile_picture])
        user.access_token = response[:access_token]
        user.save!
      end

      user
    end

end
