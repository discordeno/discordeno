import type { FeatureList } from '@site/src/types';

export default function Feature({ data }: FeatureList) {
  return (
    <div className="col col--4">
      <div className="text--center">{data.feature.Svg}</div>

      <div className="text--center padding-horiz--md">
        <h3>{data.feature.title}</h3>
        {data.feature.description}
      </div>
    </div>
  );
}
