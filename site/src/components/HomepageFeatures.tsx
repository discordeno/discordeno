import useBaseUrl from "@docusaurus/useBaseUrl";
import React from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "REST does not rest!",
    image: "/img/undraw_docusaurus_mountain.svg",
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
    title: "Zero Downtime Updates",
    image: "/img/undraw_docusaurus_tree.svg",
    description: (
      <>
        <ul>
          <li>Instant bot restarts/updates.</li>
          <li>
            Automated sharding &{" "}
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
    title: "No More Forks!",
    image: "/img/undraw_docusaurus_react.svg",
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
];

function Feature({ title, image, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <img className={styles.featureSvg} alt={title} src={useBaseUrl(image)} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => <Feature key={idx} {...props} />)}
        </div>
      </div>
    </section>
  );
}
