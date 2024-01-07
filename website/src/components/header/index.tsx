import Link from '@docusaurus/Link'
import { Button, Header, HeaderBody, Highlight } from '@site/src/styling'

export default function DiscordenoHeader(): JSX.Element {
  return (
    <>
      <Header>
        <h1>Its time to ditch Eris and Discord.js</h1>
        <h2>
          Making <Highlight>Scalable</Highlight> Bots Easy!
        </h2>
        <HeaderBody>
          <Button variant="primary">
            <Link to="/docs/intro">Documentation</Link>
          </Button>
        </HeaderBody>
      </Header>
    </>
  )
}
