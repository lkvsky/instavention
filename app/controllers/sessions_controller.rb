class SessionsController < ApplicationController
  def new
    instagram_config

    @user = User.new
  end

  def create
    redirect_to instagram_log_in
  end

  def destroy
    user = User.find_by_access_token(session[:access_token])
    Photo.delete_by_user(user)

    if user.instagram_username == "Guest"
      user.destroy
      session[:access_token] = nil
    else
      user.access_token = nil
      session[:access_token] = nil
    end

    redirect_to root_path
  end

  private

    def instagram_config
      Instagram.configure do |config|
        config.client_id = CLIENT_ID
        config.client_secret = CLIENT_SECRET
      end
    end

    def instagram_log_in
      "https://api.instagram.com/oauth/authorize/?client_id=#{CLIENT_ID}&redirect_uri=#{CALLBACK_URL}&response_type=code"
    end
end
