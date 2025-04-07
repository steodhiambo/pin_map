import { Link } from '@inertiajs/react'

export default function Layout({ children, user }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-xl font-bold text-gray-900">
                  Pin Map
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              {user ? (
                <div className="flex space-x-4">
                  {user.role === 'admin' && (
                    <Link
                      href="/admin/dashboard"
                      className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Logout
                  </Link>
                </div>
              ) : (
                <>
                  <Link
                    href={route('login')}
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Login
                  </Link>
                  <Link
                    href={route('register')}
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  )
}