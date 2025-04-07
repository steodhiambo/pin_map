// app/javascript/Pages/Auth/Login.jsx
import { Head, Link, useForm } from '@inertiajs/react'
import GuestLayout from '@/Layouts/GuestLayout'

export default function Login({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  })

  const submit = (e) => {
    e.preventDefault()
    post(route('login'))
  }

  return (
    <GuestLayout>
      <Head title="Log in" />
      
      <div className="mb-4 text-sm text-gray-600">
        {status}
      </div>

      <form onSubmit={submit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
          />
          {errors.email && <div>{errors.email}</div>}
        </div>

        <div className="mt-4">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
          />
          {errors.password && <div>{errors.password}</div>}
        </div>

        <div className="block mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={data.remember}
              onChange={(e) => setData('remember', e.target.checked)}
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
        </div>

        <div className="flex items-center justify-end mt-4">
          <Link
            href={route('password.request')}
            className="underline text-sm text-gray-600 hover:text-gray-900"
          >
            Forgot your password?
          </Link>

          <button type="submit" disabled={processing} className="ml-4">
            Log in
          </button>
        </div>
      </form>
    </GuestLayout>
  )
}