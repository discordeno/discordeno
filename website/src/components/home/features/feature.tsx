import React from 'react'
import { FeatureList } from '@site/src/types'
import clsx from 'clsx'

export default function Feature({ data }: FeatureList): JSX.Element {
  return (
    <div className={clsx('col col--4 animate__animated animate__fadeInDown')}>
      <div className="text--center">{data.feature.Svg}</div>

      <div className="text--center padding-horiz--md">
        <h3>{data.feature.title}</h3>
        <p>{data.feature.description}</p>
      </div>
    </div>
  )
}
