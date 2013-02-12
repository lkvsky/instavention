class SessionsController < ApplicationController

  def show
    instagram_config

    @client_id = CLIENT_ID
    @redirect_path = CALLBACK_URL
  end

  def new
    instagram_config

    response = Instagram.get_access_token(params[:code], :redirect_uri => CALLBACK_URL)
    user = save_user(response)
    session[:access_token] = user.access_token

    redirect_to new_photo_path
  end

  def destroy
    user = User.find_by_access_token(session[:access_token])

    user.access_token = nil
    session[:access_token] = nil

    redirect_to root_path
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

    def instagram_config
      Instagram.configure do |config|
        config.client_id = CLIENT_ID
        config.client_secret = CLIENT_SECRET
      end
    end

end
