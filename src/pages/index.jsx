import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | SWAPI</title>
      </Head>

      <h1>Navigate through categories!</h1>

      <style jsx>{`
        h1 {
          position: absolute;
          top: 35%;
          width: 100%;
          padding: 0 10px;
          font-size: 80px;
          color: #fff;
          text-align: center;
          text-transform: uppercase;
        }
      `}</style>
    </>
  )
}
