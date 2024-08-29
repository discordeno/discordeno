import Layout from '@theme/Layout'
import { useEffect, useState } from 'react'
import Footer from '../components/footer'
import DiscordenoHeader from '../components/header'
import DiscordenoFAQ from '../components/home/faq'
import DiscordenoFeatures from '../components/home/features'
import DiscordenoReviews from '../components/home/reviews'
import { MainPage } from '../styling'

export default function Home(): JSX.Element {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
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
