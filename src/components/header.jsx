import Link from 'next/link'
import { useRouter } from 'next/router'

function Header({ navs = [] }) {
  const { asPath, query, locale } = useRouter()

  return (
    <header>
      <div className="container">
        <nav>
          <ul>
            <li>
              <Link href="/">
                <a className={asPath === '/' && 'active'}>HOME</a>
              </Link>
            </li>
            {navs.map(nav => (
              <li key={nav}>
                <Link href={`/${nav}`}>
                  <a className={query.category === nav && 'active'}>{nav}</a>
                </Link>
              </li>
            ))}

            <li className="language-switcher language-switcher--en">
              <Link href={asPath} locale="en">
                <a className={locale === 'en' && 'active'}>EN</a>
              </Link>
            </li>
            <li className="language-switcher language-switcher--wo">
              <Link href={asPath} locale="wo">
                <a className={locale === 'wo' && 'active'}>WO</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <style jsx>{`
        header {
          background: #000;
          color: #fff;

          ul {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid gray;

            li {
              text-transform: uppercase;

              &.language-switcher {
                position: absolute;

                &--en {
                  right: 76px;
                }
                &--wo {
                  right: 0;
                }
              }

              a {
                display: block;
                padding: 20px 25px;
                opacity: 0.8;

                &.active,
                &:hover {
                  background: rgba(255, 255, 255, 0.2);
                  opacity: 1;
                }
              }
            }
          }
        }
      `}</style>
    </header>
  )
}

export { Header }
