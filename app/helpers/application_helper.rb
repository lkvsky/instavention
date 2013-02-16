module ApplicationHelper
  def instagram_log_in
    "https://api.instagram.com/oauth/authorize/?client_id=#{CLIENT_ID}&redirect_uri=#{CALLBACK_URL}&response_type=code"
  end

  def current_user
    User.find_by_access_token(session[:access_token]) if session[:access_token]
  end
end
