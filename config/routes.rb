Instavention::Application.routes.draw do
  resource :session, :only => [:new, :create, :destroy]
  resources :users, :only => [:new, :show, :index]
  resources :photos, :only => [:index]

  root :to => "sessions#new"
end
