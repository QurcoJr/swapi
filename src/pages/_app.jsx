import App from 'next/app'
import 'styles/globals.css'
import { getAllCategories } from 'api-client/get-all-categories'
import { Layout } from 'components/layout'

function MyApp({ Component, pageProps, categories }) {
  return (
    <Layout categories={categories}>
      <Component {...pageProps} />
    </Layout>
  )
}

MyApp.getInitialProps = async appContext => {
  const appInitialProps = await App.getInitialProps(appContext)
  let categories = await getAllCategories()
  categories = Object.keys(categories)

  return { ...appInitialProps, categories }
}

export default MyApp
