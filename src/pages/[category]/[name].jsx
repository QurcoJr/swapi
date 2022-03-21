import Head from 'next/head'
import { useRouter } from 'next/router'
import { getAllCategories } from 'api-client/get-all-categories'
import { getCategory } from 'api-client/get-category'
import { searchUnit } from 'api-client/search-unit'
import { getName } from 'utils/get-name'

function renderDetails(details) {
  const jsx = Object.entries(details).map(([key, value]) => {
    if (typeof value !== 'string' || key === 'url' || value.includes('://')) {
      return null
    }

    return (
      <tr key={key}>
        <td>{key?.replaceAll('_', ' ')}: </td>
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
        <title>{getName(details)?.toUpperCase()} | SWAPI</title>
      </Head>
      <div className="container">
        <button onClick={router.back}>Go Back &#8592;</button>
        <h1>{getName(details)}</h1>
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
  const data = await searchUnit({
    categoryName: params.category,
    name: params.name?.replaceAll('-', ' '),
    lang: locale
  })

  return {
    props: {
      details: data.results?.[0] ?? data.rcwochuanaoc[0]
    }
  }
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
      params.push({
        category: categories[index],
        name: getName(data)?.replaceAll(' ', '-').toLowerCase()
      })
    })
  })

  params.forEach(param => {
    locales.forEach(loc => paths.push({ params: param, locale: loc }))
  })

  return {
    paths,
    fallback: false
  }
}

export default DetailsPage
