Rails.application.routes.draw do

  root 'homepage#index'

  resources :todos
  
  # get '*path', to: 'homepage#index', via: :all

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
