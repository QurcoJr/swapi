import Head from 'next/head'
import { useRouter } from 'next/router'
import { getAllCategories } from 'api-client/get-all-categories'
import { getCategory } from 'api-client/get-category'
import { getSpecificUnit } from 'api-client/get-specific-unit'

function renderDetails(details) {
  const jsx = Object.entries(details).map(([key, value]) => {
    if (typeof value !== 'string' || key === 'url' || value.includes('://')) {
      return null
    }

    return (
      <tr key={key}>
        <td>{key.replace('_', ' ')}: </td>
        <td>{value}</td>
      </tr>
    )
  })

  return (
    <table>
      <tbody>{jsx}</tbody>
    </table>
  )
}

function DetailsPage({ details }) {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>
          {(details.name ?? details.title ?? details.whrascwo)?.toUpperCase()} |
          SWAPI
        </title>
      </Head>
      <div className="container">
        <button onClick={router.back}>Go Back &#8592;</button>
        <h1>{details.name ?? details.title ?? details.whrascwo}</h1>
        {renderDetails(details)}
      </div>

      <style jsx>{`
        h1 {
          text-align: center;
          font-size: 40px;
        }

        button {
          margin: 10px 0;
          background: none;
          border: none;
          color: #fff;
          font-size: 30px;
          cursor: pointer;

          :hover {
            outline: 1px solid #fff;
          }
        }
      `}</style>
    </>
  )
}

export async function getStaticProps({ params, locale }) {
  const details = await getSpecificUnit({
    categoryName: params.category,
    id: params.id,
    lang: locale
  })

  return { props: { details } }
}

export async function getStaticPaths({ locales }) {
  let categories = await getAllCategories()
  categories = Object.keys(categories)

  const allCategoriesData = await Promise.all(
    categories.map(category => getCategory({ categoryName: category }))
  )

  const params = []
  const paths = []
  allCategoriesData.forEach((category, index) => {
    category.results.forEach(data => {
      // url => 'https://swapi.dev/api/vehicles/1/' => ['https:', '', 'swapi.dev', 'api', 'vehicles', '1', ''] => 1
      const urlChunks = data.url.split('/')
      const id = urlChunks[urlChunks.length - 2]
      params.push({
        category: categories[index],
        id
      })
    })
  })

  // remove "default" from locales
  const actualLocales = locales.slice(1)
  params.forEach(param => {
    actualLocales.forEach(loc => paths.push({ params: param, locale: loc }))
  })

  return {
    paths,
    fallback: false
  }
}

export default DetailsPage
