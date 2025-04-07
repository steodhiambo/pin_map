import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import Layout from './Shared/Layout'
import { InertiaProgress } from '@inertiajs/progress'

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    return pages[`./Pages/${name}.jsx`]
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <Layout>
        <App {...props} />
      </Layout>
    )
  }
})

InertiaProgress.init({
  color: '#4B5563',
  showSpinner: true,
})