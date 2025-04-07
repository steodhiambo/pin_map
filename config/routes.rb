# config/routes.rb
Rails.application.routes.draw do
  devise_for :users, 
    skip: :all, # This prevents the automatic route generation
    controllers: {
      sessions: 'users/sessions' # Add this line to specify your custom controller
    }

  devise_scope :user do
    get 'users/sign_in', to: 'users/sessions#new', as: :new_user_session
    post 'users/sign_in', to: 'users/sessions#create', as: :user_session
    delete 'users/sign_out', to: 'users/sessions#destroy', as: :destroy_user_session
    get 'users/sign_up', to: 'devise/registrations#new', as: :new_user_registration
    post 'users/sign_up', to: 'devise/registrations#create', as: :user_registration
  end

  root 'locations#index'
  resources :locations, only: [:index, :create, :destroy]
  
  namespace :admin do
    get 'dashboard', to: 'dashboard#index'
    delete 'users/:id', to: 'dashboard#destroy_user', as: 'destroy_user'
  end
end