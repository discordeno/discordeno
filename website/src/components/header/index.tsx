import Link from '@docusaurus/Link'
import { Header, Highlight, Button, HeaderBody } from '@site/src/styling'
import React from 'react'

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
