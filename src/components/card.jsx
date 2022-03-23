import Link from 'next/link'
import Image from 'next/image'
import placeholder from '../../public/images/placeholder.jpeg'
import { getName } from 'utils/get-name'

const apiURL = process.env.NEXT_PUBLIC_API_URL

function Card({ element, categoryName }) {
  return (
    <Link
      href={`/${categoryName}/${getName(element)
        .replaceAll(' ', '-')
        .replaceAll('/', '-')
        .toLowerCase()}`}
    >
      <a className="card">
        <div className="placeholder">
          <Image src={placeholder} alt="star wars" height={200} width={160} />
        </div>
        <h2>{getName(element)}</h2>

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
