import Layout from '@theme/Layout';
import Footer from '../components/footer';
import DiscordenoHeader from '../components/header';
import DiscordenoFAQ from '../components/home/faq';
import DiscordenoFeatures from '../components/home/features';
import DiscordenoReviews from '../components/home/reviews';

export default function Home(): React.JSX.Element {
  return (
    <Layout title={`Discordeno Documentation`} description="An in-depth guide to using the Discordeno library for Deno.">
      <DiscordenoHeader />
      <div style={{ backgroundColor: 'var(--ifm-navbar-background-color)' }}>
        <DiscordenoFeatures />
        <DiscordenoReviews />
        <DiscordenoFAQ />
      </div>
      <Footer />
    </Layout>
  );
}
