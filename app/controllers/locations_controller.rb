# app/controllers/locations_controller.rb
class LocationsController < ApplicationController
  before_action :authenticate_user!, except: [:index]  # Require auth for all actions except index
  before_action :set_location, only: [:destroy]
  before_action :authorize_admin, only: [:destroy]

  def index
    # Show all locations to both authenticated and unauthenticated users
    render inertia: 'Locations/Index', 
      props: {
        locations: Location.all.as_json(only: [:id, :name, :latitude, :longitude, :user_id]),
        can: {
          create_location: user_signed_in?,  # Add this to control UI visibility
          destroy_location: user_signed_in? && current_user.admin?
        }
      }
  end

  def create
    location = current_user.locations.create!(location_params)
    redirect_to locations_path, notice: 'Location created successfully'
  end

  def destroy
    @location.destroy!
    redirect_to locations_path, notice: 'Location deleted successfully'
  end

  private

  def set_location
    @location = Location.find(params[:id])
  end

  def location_params
    params.require(:location).permit(:name, :latitude, :longitude)
  end

  def authorize_admin
    unless current_user.admin?
      redirect_to root_path, alert: 'Not authorized'
    end
  end
end