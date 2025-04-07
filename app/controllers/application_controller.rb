# app/controllers/application_controller.rb
class ApplicationController < ActionController::Base
    include InertiaRails::Controller
  
    before_action :authenticate_user!, except: [:index, :show] # Or whatever actions should be public
  end

# app/controllers/users/sessions_controller.rb
class Users::SessionsController < Devise::SessionsController
    def new
      render inertia: 'Devise/Sessions/New'
    end
  end