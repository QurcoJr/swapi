import Link from 'next/link'
import Image from 'next/image'
import placeholder from '../../public/images/placeholder.jpeg'

const apiURL = process.env.NEXT_PUBLIC_API_URL

function Card({ element }) {
  return (
    <Link href={element.url.slice(apiURL.length, -1)}>
      <a className="card">
        <div className="placeholder">
          <Image src={placeholder} alt="star wars" height={200} width={160} />
        </div>
        <h2>{element.name ?? element.title}</h2>

        <style jsx>{`
          .card {
            display: flex;
            border: 2px solid #fff;
            margin-bottom: 20px;

            &:hover {
              opacity: 0.8;
              background: #000;
            }

            .placeholder {
              margin-right: 20px;
            }
          }
        `}</style>
      </a>
    </Link>
  )
}

export { Card }
