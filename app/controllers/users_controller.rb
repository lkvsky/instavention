class UsersController < ApplicationController
  def new
    begin
      response = Instagram.get_access_token(params[:code], :redirect_uri => CALLBACK_URL)
      user = save_user(response)
      session[:access_token] = user.access_token

      redirect_to new_photo_path
    rescue
      redirect_to session_path
    end
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
        user = User.new(response[:user])
        user.access_token = response[:access_token]
        user.save!
      end

      user
    end

end
