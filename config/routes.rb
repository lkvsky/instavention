Instavention::Application.routes.draw do
  resource :session
  resources :users
  resources :photos

  root :to => "sessions#show"
end
