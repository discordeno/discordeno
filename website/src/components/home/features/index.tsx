import React from 'react'
import styles from '@site/src/styling/styles.module.css'
import { FeatureItem } from '@site/src/types'
import Feature from './feature'

const FeatureList: FeatureItem[] = [
  {
    title: 'REST does not rest!',
    Svg: (
      <svg
        width="54"
        height="54"
        viewBox="0 0 54 54"
        fill="none"
        style={{
          color: 'inherit',
        }}
      >
        <path
          d="M45.225 20.7482C41.1525 20.7482 39.4875 17.8682 41.5125 14.3357C42.6825 12.2882 41.985 9.67815 39.9375 8.50815L36.045 6.28065C34.2675 5.22315 31.9725 5.85315 30.915 7.63065L30.6675 8.05815C28.6425 11.5907 25.3125 11.5907 23.265 8.05815L23.0175 7.63065C22.005 5.85315 19.71 5.22315 17.9325 6.28065L14.04 8.50815C11.9925 9.67815 11.295 12.3107 12.465 14.3582C14.5125 17.8682 12.8475 20.7482 8.775 20.7482C6.435 20.7482 4.5 22.6607 4.5 25.0232V28.9832C4.5 31.3232 6.4125 33.2582 8.775 33.2582C12.8475 33.2582 14.5125 36.1382 12.465 39.6707C11.295 41.7182 11.9925 44.3282 14.04 45.4982L17.9325 47.7257C19.71 48.7832 22.005 48.1532 23.0625 46.3757L23.31 45.9482C25.335 42.4157 28.665 42.4157 30.7125 45.9482L30.96 46.3757C32.0175 48.1532 34.3125 48.7832 36.09 47.7257L39.9825 45.4982C42.03 44.3282 42.7275 41.6957 41.5575 39.6707C39.51 36.1382 41.175 33.2582 45.2475 33.2582C47.5875 33.2582 49.5225 31.3457 49.5225 28.9832V25.0232C49.5 22.6832 47.5875 20.7482 45.225 20.7482ZM27 34.3157C22.9725 34.3157 19.6875 31.0307 19.6875 27.0032C19.6875 22.9757 22.9725 19.6907 27 19.6907C31.0275 19.6907 34.3125 22.9757 34.3125 27.0032C34.3125 31.0307 31.0275 34.3157 27 34.3157Z"
          fill="currentColor"
        />
      </svg>
    ),
    description: (
      <>
        <ul>
          <li>Restart without losing any requests.</li>
          <li>Prevent Invalid 1 Hour Discord Bans.</li>
          <li>Freedom from global rate limit errors.</li>
          <li>Single source of contact to API.</li>
          <li>Beautiful analytics plugins.</li>
          <li>Scalability! Scalability! Scalability!</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Zero Downtime Updates',
    Svg: (
      <svg
        width="54"
        height="54"
        viewBox="0 0 54 54"
        fill="none"
        style={{
          color: 'inherit',
        }}
      >
        <path
          d="M27 18.5625C22.9725 18.5625 19.6875 21.8475 19.6875 25.875C19.6875 29.9025 22.9725 33.1875 27 33.1875C31.0275 33.1875 34.3125 29.9025 34.3125 25.875C34.3125 21.8475 31.0275 18.5625 27 18.5625ZM29.25 25.155C29.25 26.5275 28.5075 27.8325 27.3375 28.53L25.605 29.565C25.335 29.7225 25.0425 29.8125 24.7275 29.8125C24.165 29.8125 23.6025 29.52 23.2875 29.0025C22.815 28.1925 23.0625 27.1575 23.8725 26.685L25.5825 25.65C25.7625 25.5375 25.8525 25.3575 25.8525 25.1775V23.085C25.8525 22.1625 26.6175 21.3975 27.54 21.3975C28.4625 21.3975 29.25 22.14 29.25 23.0625V25.155Z"
          fill="currentColor"
        />
        <path
          d="M41.7168 9.38392L29.3418 4.7489C28.0593 4.27642 25.9668 4.27642 24.6843 4.7489L12.3093 9.38392C9.92426 10.2839 7.98926 13.0739 7.98926 15.6164V33.8414C7.98926 35.6639 9.18176 38.0714 10.6443 39.1514L23.0193 48.3989C25.2018 50.0414 28.7793 50.0414 30.9618 48.3989L43.3368 39.1514C44.7993 38.0489 45.9918 35.6639 45.9918 33.8414V15.6164C46.0143 13.0739 44.0793 10.2839 41.7168 9.38392ZM27.0018 36.5639C21.1068 36.5639 16.3143 31.7714 16.3143 25.8764C16.3143 19.9814 21.1068 15.1889 27.0018 15.1889C32.8968 15.1889 37.6893 19.9814 37.6893 25.8764C37.6893 31.7714 32.8968 36.5639 27.0018 36.5639Z"
          fill="currentColor"
        />
      </svg>
    ),
    description: (
      <>
        <ul>
          <li>Instant bot restarts/updates.</li>
          <li>
            Automated sharding &{' '}
            <strong>
              <i>re</i>
            </strong>
            sharding.
          </li>
          <li>Scale horizontally and save money!</li>
          <li>Stop losing events during reboots!</li>
          <li>Max efficiency with Shards/Worker!</li>
          <li>Scalability! Scalability! Scalability!</li>
        </ul>
      </>
    ),
  },
  {
    title: 'No More Forks!',
    Svg: (
      <svg
        width="54"
        height="54"
        viewBox="0 0 54 54"
        fill="none"
        style={{
          color: 'inherit',
        }}
      >
        <path
          d="M36.4275 4.5H17.5725C9.3825 4.5 4.5 9.3825 4.5 17.5725V36.405C4.5 44.6175 9.3825 49.5 17.5725 49.5H36.405C44.595 49.5 49.4775 44.6175 49.4775 36.4275V17.5725C49.5 9.3825 44.6175 4.5 36.4275 4.5ZM22.7925 32.625C23.445 33.2775 23.445 34.3575 22.7925 35.01C22.455 35.3475 22.0275 35.505 21.6 35.505C21.1725 35.505 20.745 35.3475 20.4075 35.01L14.805 29.4075C13.4775 28.08 13.4775 25.9425 14.805 24.615L20.4075 19.0125C21.06 18.36 22.14 18.36 22.7925 19.0125C23.445 19.665 23.445 20.745 22.7925 21.3975L17.19 27L22.7925 32.625ZM39.195 29.385L33.5925 34.9875C33.255 35.325 32.8275 35.4825 32.4 35.4825C31.9725 35.4825 31.545 35.325 31.2075 34.9875C30.555 34.335 30.555 33.255 31.2075 32.6025L36.81 27L31.2075 21.375C30.555 20.7225 30.555 19.6425 31.2075 18.99C31.86 18.3375 32.94 18.3375 33.5925 18.99L39.195 24.5925C40.5225 25.92 40.5225 28.08 39.195 29.385Z"
          fill="currentColor"
        />
      </svg>
    ),

    description: (
      <>
        <ul>
          <li>100% customizable without forking!</li>
          <li>By default, the lib caches NOTHING!</li>
          <li>100% Custom cache support.</li>
          <li>Cache only the props your bot needs.</li>
          <li>Customize any internal function!</li>
          <li>Scalability! Scalability! Scalability!</li>
        </ul>
      </>
    ),
  },
]

export default function DiscordenoFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature
              key={idx}
              data={{
                feature: props,
                featureList: FeatureList,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
