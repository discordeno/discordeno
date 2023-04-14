import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import 'animate.css'
import DiscordenoHeader from '../components/header'
import { MainPage } from '../styling'
import DiscordenoFeatures from '../components/home/features'
import Footer from '../components/footer'
import DiscordenoReviews from '../components/home/reviews'
import DiscordenoFAQ from '../components/home/faq'

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={`Discordeno Documentation`}
      description="An in-depth guide to using the Discordeno library for Deno."
    >
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
