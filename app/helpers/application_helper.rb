module ApplicationHelper
  def current_user
    User.find_by_access_token(session[:access_token]) if session[:access_token]
  end
end
