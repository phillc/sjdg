import "../styles/style.scss"
import Head from 'next/head'
import Header from '../components/header'

export default () =>
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
      <title>South Jersey Disc Golf</title>
    </Head>
    <Header isFull={true} />
  </div>

