class SessionsController < ApplicationController
  def show
    instagram_config
  end

  def destroy
    user = User.find_by_access_token(session[:access_token])
    Photo.delete_by_user(user)

    user.access_token = nil
    session[:access_token] = nil

    redirect_to root_path
  end

  private

    def instagram_config
      Instagram.configure do |config|
        config.client_id = CLIENT_ID
        config.client_secret = CLIENT_SECRET
      end
    end
end
