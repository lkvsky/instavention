module ApplicationHelper
  def instagram_log_in
    "https://api.instagram.com/oauth/authorize/?client_id=#{CLIENT_ID}&redirect_uri=#{CALLBACK_URL}&response_type=code"
  end
end
