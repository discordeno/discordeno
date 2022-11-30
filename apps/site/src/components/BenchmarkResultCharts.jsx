import { useColorMode } from "@docusaurus/theme-common";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
// Colors from https://github.com/github/linguist/blob/master/lib/linguist/languages.yml
const toolColors = {
  cargo: "#dea584",
  go: "#00add8",
  benchmarkjs: "#f1e05a",
  benchmarkluau: "#000080",
  pytest: "#3572a5",
  googlecpp: "#f34b7d",
  catch2: "#f34b7d",
  julia: "#a270ba",
  benchmarkdotnet: "#178600",
  customBiggerIsBetter: "#38ff38",
  customSmallerIsBetter: "#ff3838",
  _: "#333333",
};

const BenchmarkResultChart = ({ name, dataset, theme }) => {
  const color = toolColors[dataset.length > 0 ? dataset[0].tool : "_"];
  const data = {
    labels: dataset.map((d) => d.commit.id.slice(0, 7)),
    datasets: [
      {
        label: name,
        data: dataset.map((d) => d.bench.value),
        borderColor: color,
        backgroundColor: color + "60", // Add alpha for #rrggbbaa
      },
    ],
  };
  const options = {
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "commit",
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: dataset.length > 0 ? dataset[0].bench.unit : "",
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      legend: {
        labels: {
          // This more specific font property overrides the global property
          defaultFontColor: theme === "light" ? "#000000" : "#FFFFFF",
        },
      },
    },
    tooltips: {
      callbacks: {
        afterTitle: (items) => {
          const { index } = items[0];
          const data = dataset[index];
          return "\n" + data.commit.message + "\n\n" + data.commit.timestamp + " committed by @" +
            data.commit.committer.username + "\n";
        },
        label: (item) => {
          let label = item.value;
          const { range, unit } = dataset[item.index].bench;
          label += " " + unit;
          if (range) {
            label += " (" + range + ")";
          }
          return label;
        },
        afterLabel: (item) => {
          const { extra } = dataset[item.index].bench;
          return extra ? "\n" + extra : "";
        },
      },
    },
    onClick: (_mouseEvent, activeElems) => {
      if (activeElems.length === 0) {
        return;
      }
      // XXX: Undocumented. How can we know the index?
      const index = activeElems[0]._index;
      const url = dataset[index].commit.url;
      window.open(url, "_blank");
    },
  };
  //  console.log(theme);
  return <Line data={data} options={options} />;
};

export default function BenchmarkResultCharts() {
  const { colorMode } = useColorMode();
  const [data, setData] = useState();

  useEffect(async () => {
    if (!data) {
      setData(
        JSON.parse(
          (await (await fetch(
            "https://raw.githubusercontent.com/discordeno/discordeno/benchies/benchmarksResult/data.js",
          )).text()).slice(24),
        ),
      );
    }
  }, []);

  function collectBenchesPerTestCase(entries) {
    const dataMap = new Map();
    for (const entry of entries) {
      const { commit, date, tool, benches } = entry;
      for (const bench of benches) {
        const result = { commit, date, tool, bench };
        const arr = dataMap.get(bench.name);
        if (arr === undefined) {
          dataMap.set(bench.name, [result]);
        } else {
          arr.push(result);
        }
      }
    }
    return dataMap;
  }

  return (data
    ? Array.from(
      collectBenchesPerTestCase(data.entries.Benchmark),
      ([key, value]) => ({ benchName: key, benches: value }),
    ).map((
      bench,
      index,
    ) => (
      <BenchmarkResultChart
        key={index}
        name={bench.benchName}
        dataset={bench.benches}
        theme={""}
      />
    ))
    : <></>);
}
