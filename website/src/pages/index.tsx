import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import DiscordenoHeader from '../components/header'
import { MainPage } from '../styling'
import DiscordenoFeatures from '../components/home/features'
import Footer from '../components/footer'
import DiscordenoReviews from '../components/home/reviews'
import DiscordenoFAQ from '../components/home/faq'

export default function Home(): JSX.Element {
  // Use loading to give time to JS to load
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false)

      // give it a small timeout to make sure the loading screen is shown
    }, 1000)
  }, [])

  if (loading)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
          background: 'var(--ifm-navbar-background-color)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <img
            src="/img/logo.png"
            alt="Discordeno Logo"
            style={{
              width: '100px',
              height: '100px',
            }}
          />
          <span
            style={{
              color: 'var(--ifm-navbar-color)',
              fontSize: '20px',
              fontWeight: 'bold',
            }}
          >
            Loading...
          </span>
        </div>
      </div>
    )

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
