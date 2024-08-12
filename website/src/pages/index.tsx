import Layout from '@theme/Layout'
import { useEffect, useState } from 'react'
import Footer from '../components/footer'
import DiscordenoHeader from '../components/header'
import DiscordenoFAQ from '../components/home/faq'
import DiscordenoFeatures from '../components/home/features'
import DiscordenoReviews from '../components/home/reviews'
import { MainPage } from '../styling'

export default function Home(): JSX.Element {
  return (
    <Layout title={`Discordeno Documentation`} description="An in-depth guide to using the Discordeno library for Deno.">
      <DiscordenoHeader />
      <MainPage>
        <DiscordenoFeatures />
        <DiscordenoReviews />
        <DiscordenoFAQ />
      </MainPage>
      <Footer />
    </Layout>
  )
}
