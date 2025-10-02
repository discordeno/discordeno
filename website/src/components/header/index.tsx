import Link from '@docusaurus/Link'
import style from './index.module.css'

export default function DiscordenoHeader() {
  return (
    <>
      <div className={style.header}>
        <h1>Its time to ditch Eris and Discord.js</h1>
        <h2>
          Making <span className={style.highlight}>Scalable</span> Bots Easy!
        </h2>
        <div className={style.headerBody}>
          <button className={style.headerButton}>
            <Link to="/docs/intro">Documentation</Link>
          </button>
        </div>
      </div>
    </>
  )
}
