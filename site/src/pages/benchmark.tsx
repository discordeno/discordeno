import { useColorMode } from "@docusaurus/theme-common";
import Layout from "@theme/Layout";
import {
  CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title,
  Tooltip
} from 'chart.js';
import React, { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const BenchmarkResultChart = ({ name, dataset }:
  {
    name: string,
    dataset: {
      bench: {
        name: string
        range: string | number
        unit: string
        value: string | number
        extra: string | number | undefined
      },
      commit: {
        author: {
          email: string,
          name: string,
          username: string
        },
        committer: {
          email: string,
          name: string,
          username: string
        },
        distinct: true,
        id: string,
        message: string,
        timestamp: string,
        tree_id: string,
        url: string
      },
      date: number
      tool: string
    }[]
  }) => {
  const { colorMode } = useColorMode();
  const lineColor = colorMode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'
  const textColor = colorMode === 'light' ? '#666' : '#999'

  const data = {
    labels: dataset.map((d) => d.commit.id.slice(0, 7)),
    datasets: [
      {
        label: name,
        data: dataset.map((d) => d.bench.value),
        borderColor: '#ff3838',
        backgroundColor: '#ff383860', // Add alpha for #rrggbbaa
      },
    ],
  };

  return <Chart type="line" data={data} options={{
    scales: {
      x: {
        title: {
          display: true,
          text: "commit",
          color: textColor
        },
        ticks: {
          color: textColor
        },
        grid: {
          color: lineColor
        }
      },
      y: {
        title: {
          display: true,
          text: dataset.length > 0 ? dataset[0].bench.unit : "",
          color: textColor
        },
        ticks: {
          color: textColor
        },
        grid: {
          color: lineColor
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        labels: {
          color: textColor
        }
      },
      tooltip: {
        callbacks: {
          afterTitle: (items) => {
            const index = items[0].dataIndex;
            const data = dataset[index];
            return "\n" + data.commit.message + "\n\n" + data.commit.timestamp + " committed by @" +
              data.commit.author.username + "\n";
          },
          label: (item) => {
            let label = item.formattedValue;
            const { range, unit } = dataset[item.datasetIndex].bench;
            label += " " + unit;
            if (range) {
              label += " (" + range + ")";
            }
            return label;
          },
          afterLabel: (item) => {
            const { extra } = dataset[item.datasetIndex].bench;
            return extra ? "\n" + extra : "";
          },
        },
      }
    },
    onClick: (_mouseEvent, activeElems) => {
      if (activeElems.length === 0) {
        return;
      }
      // XXX: Undocumented. How can we know the index?
      const index = activeElems[0].index;
      const url = dataset[index].commit.url;
      window.open(url, "_blank");
    },
  }} />;
};

export default function BenchmarkResultCharts(): JSX.Element {
  const [data, setData] = useState<{ entries: { Benchmark: [] } }>();

  useEffect(() => {
    if (!data) {
      (async () => {
        setData(
          JSON.parse(
            (await (await fetch(
              "https://raw.githubusercontent.com/discordeno/discordeno/benchies/benchmarksResult/data.js",
            )).text()).slice(24),
          ),
        )
      })()
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

  return (
    <Layout>
      <div style={{ padding: '10vh 20vw' }}>
        {data
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
            />
          ))
          : <></>}
      </div>
    </Layout>
  );
}
