// esbuild.config.js
require('esbuild').build({
  entryPoints: ['app/javascript/application.js'],
  bundle: true,
  outfile: 'app/assets/builds/application.js',
  loader: {
    '.jsx': 'jsx',
  },
  plugins: [
    {
      name: 'inertia',
      setup(build) {
        build.onLoad({ filter: /application\.js$/ }, async (args) => {
          const contents = await fs.promises.readFile(args.path, 'utf8');
          return {
            contents: `
              import { createInertiaApp } from '@inertiajs/react'
              import { createRoot } from 'react-dom/client'
              import { InertiaProgress } from '@inertiajs/progress'
              import Layout from './Shared/Layout'

              createInertiaApp({
                resolve: name => {
                  const pages = import.meta.glob('./Pages/**/*.jsx')
                  return pages[\`./Pages/\${name}.jsx\`]
                },
                setup({ el, App, props }) {
                  createRoot(el).render(
                    <Layout>
                      <App {...props} />
                    </Layout>
                  )
                },
                window: window,
              })

              InertiaProgress.init({
                color: '#4B5563',
                showSpinner: true,
              })

              ${contents}
            `,
            loader: 'jsx',
          }
        });
      },
    },
  ],
}).catch(() => process.exit(1));