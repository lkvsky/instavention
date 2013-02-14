class SessionsController < ApplicationController
  def show
    instagram_config

    @client_id = CLIENT_ID
    @redirect_path = CALLBACK_URL
  end

  def destroy
    user = User.find_by_access_token(session[:access_token])

    user.access_token = nil
    session[:access_token] = nil
    user.photos.delete_all

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
