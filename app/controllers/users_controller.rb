class UsersController < ApplicationController
  def new
    if params[:error]
      redirect_to root_path
    elsif params[:code]
      response = Instagram.get_access_token(params[:code], :redirect_uri => CALLBACK_URL)
      user = save_user(response)
      
      session[:access_token] = user.access_token

      redirect_to photos_path
    else
      user = User.new
      user.instagram_username = "Guest"
      user.access_token = SecureRandom.urlsafe_base64
      user.save!

      session[:access_token] = user.access_token

      redirect_to photos_path
    end
  end

  def show
    user = User.find(params[:id])
    user_obj = {
      :id => user.id,
      :instagram_profile => user.instagram_profile,
      :instagram_username => user.instagram_username
    }

    respond_to do |format|
      format.html { redirect_to root_path}
      format.json { render :json => user_obj}
    end
  end

  def index
    users = User.all

    user_json = users.map do |user|
      { :id => user.id,
        :instagram_profile => user.instagram_profile,
        :instagram_username => user.instagram_username }
    end

    respond_to do |format|
      format.html { redirect_to root_path }
      format.json { render :json => user_json }
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
