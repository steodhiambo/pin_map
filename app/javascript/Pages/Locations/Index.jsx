import { Head, Link, usePage } from '@inertiajs/react'
import Layout from '@/Shared/Layout'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useState } from 'react'

export default function LocationsIndex() {
  const { props } = usePage()
  const [newLocation, setNewLocation] = useState({
    name: '',
    latitude: 0,
    longitude: 0
  })

  const handleMapClick = (e) => {
    // Only allow setting location if user is logged in
    if (props.auth.user) {
      setNewLocation({
        ...newLocation,
        latitude: e.latlng.lat,
        longitude: e.latlng.lng
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    Inertia.post('/locations', { location: newLocation })
  }

  return (
    <Layout user={props.auth.user}>
      <Head title="Locations" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <h1 className="text-2xl font-bold mb-4">Location Map</h1>
              
              <div className="mb-6 h-96">
                <MapContainer 
                  center={[51.505, -0.09]} 
                  zoom={13} 
                  style={{ height: '100%', width: '100%' }}
                  onClick={handleMapClick}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {props.locations.map(location => (
                    <Marker 
                      key={location.id} 
                      position={[location.latitude, location.longitude]}
                    >
                      <Popup>
                        <div>
                          <h3 className="font-bold">{location.name}</h3>
                          {props.can.destroy_location && (
                            <Link
                              href={`/locations/${location.id}`}
                              method="delete"
                              as="button"
                              className="text-red-500 hover:text-red-700"
                            >
                              Delete
                            </Link>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>

              {/* Only show form if user is logged in */}
              {props.can.create_location && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Location Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={newLocation.name}
                      onChange={(e) => setNewLocation({...newLocation, name: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
                        Latitude
                      </label>
                      <input
                        type="number"
                        id="latitude"
                        value={newLocation.latitude}
                        onChange={(e) => setNewLocation({...newLocation, latitude: parseFloat(e.target.value)})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                        step="any"
                      />
                    </div>
                    <div>
                      <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
                        Longitude
                      </label>
                      <input
                        type="number"
                        id="longitude"
                        value={newLocation.longitude}
                        onChange={(e) => setNewLocation({...newLocation, longitude: parseFloat(e.target.value)})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                        step="any"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add Location
                  </button>
                </form>
              )}

              {/* Show login prompt if not logged in */}
              {!props.auth.user && (
                <div className="mt-4 text-center">
                  <Link 
                    href={route('login')} 
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    Please log in to add locations
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}