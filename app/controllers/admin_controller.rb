# app/controllers/admin_controller.rb
class AdminController < ApplicationController
    before_action :authorize_admin
  
    def dashboard
      render inertia: 'Admin/Dashboard', props: {
        users: User.all.as_json(only: [:id, :email, :role]),
        can: {
          destroy_user: true
        }
      }
    end
  
    def destroy_user
      user = User.find(params[:id])
      user.destroy!
      redirect_to admin_dashboard_path, notice: 'User deleted successfully'
    end
  
    private
  
    def authorize_admin
      redirect_to root_path, alert: 'Not authorized' unless current_user.admin?
    end
  end