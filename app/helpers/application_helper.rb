module ApplicationHelper
  def instagram_log_in(client_id, redirect_uri)
    "https://api.instagram.com/oauth/authorize/?client_id=#{client_id}&redirect_uri=#{redirect_uri}&response_type=code"
  end
end
