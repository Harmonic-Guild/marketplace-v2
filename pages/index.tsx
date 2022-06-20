import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import FeaturesNft from '../components/FeaturesNft'
import WeeklyNft from '../components/WeeklyNft'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>MarketPlace Version_2</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturesNft/>
      <WeeklyNft/>
    </div>
  )
}

export default Home
