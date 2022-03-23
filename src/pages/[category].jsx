import Head from 'next/head'
import { useRouter } from 'next/router'
import { Card } from 'components/card'
import { getCategory } from 'api-client/get-category'
import { getCategories } from 'api-client/get-categories'
import { getName } from 'utils/get-name'

function Category({ category = null }) {
  const {
    query: { category: categoryName }
  } = useRouter()

  return (
    <>
      <Head>
        <title>{categoryName.toUpperCase()} | SWAPI</title>
      </Head>

      <div className="container">
        <h1>{categoryName.toUpperCase()}</h1>
        {category.results.map(element => (
          <Card
            element={element}
            key={getName(element)}
            categoryName={categoryName}
          />
        ))}
      </div>

      <style jsx>{`
        h1 {
          text-align: center;
          font-size: 40px;
        }
      `}</style>
    </>
  )
}

export async function getStaticProps({ params }) {
  const response = await getCategory({ categoryName: params.category })
  return { props: { category: response.data.category } }
}

export async function getStaticPaths({ locales }) {
  const response = await getCategories()
  const { categories } = response.data

  const paths = []
  categories.forEach(category => {
    locales.forEach(loc => {
      paths.push({ params: { category }, locale: loc })
    })
  })

  return {
    paths,
    fallback: false
  }
}

export default Category
