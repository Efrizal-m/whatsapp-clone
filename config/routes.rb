Rails.application.routes.draw do
  root 'chatrooms#index'
  
  resources :chatrooms, only: [:index]
  resources :messages, only: [:create, :index]
  
  mount ActionCable.server => '/cable'
end
