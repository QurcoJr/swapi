import App from 'next/app'
import 'styles/globals.css'
import { getCategories } from 'api-client/get-categories'
import { Layout } from 'components/layout'
import { API } from 'aws-amplify'
import amp_config from 'aws-exports'

API.configure(amp_config)

function MyApp({ Component, pageProps, categories }) {
  return (
    <Layout categories={categories}>
      <Component {...pageProps} />
    </Layout>
  )
}

MyApp.getInitialProps = async appContext => {
  const appInitialProps = await App.getInitialProps(appContext)
  const response = await getCategories()

  return { ...appInitialProps, categories: response.data.categories }
}

export default MyApp
