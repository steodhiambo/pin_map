# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
# db/seeds.rb
admin = User.create!(
  email: 'admin@example.com',
  password: 'password',
  password_confirmation: 'password',
  role: :admin
)

user = User.create!(
  email: 'user@example.com',
  password: 'password',
  password_confirmation: 'password'
)

# Create some sample locations
admin.locations.create!([
  { name: 'London', latitude: 51.5074, longitude: -0.1278 },
  { name: 'New York', latitude: 40.7128, longitude: -74.0060 }
])

user.locations.create!([
  { name: 'Paris', latitude: 48.8566, longitude: 2.3522 },
  { name: 'Tokyo', latitude: 35.6762, longitude: 139.6503 }
])