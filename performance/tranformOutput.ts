const baselineSysbenchScore = 2000;
let sysbenchScore = 2000;

try {
  const { stdout } = await Deno.spawn("sysbench", { args: ["cpu", "run"] });
  const textout = new TextDecoder().decode(stdout);
  sysbenchScore = parseFloat(textout.match(/\s+events per second:\s+(.+)/)![1]);
} catch {
  //
}

const output = await Deno.readTextFile("output.txt");
const lines = output.split(/\r?\n/g);

const ret = [];

const unitMultiplier = {
  "s": 1000 * 1000 * 1000 * (baselineSysbenchScore / sysbenchScore),
  "ms": 1000 * 1000 * (baselineSysbenchScore / sysbenchScore),
  "µs": 1000 * (baselineSysbenchScore / sysbenchScore),
  "ns": 1 * (baselineSysbenchScore / sysbenchScore),
  "ps": 0.1 * (baselineSysbenchScore / sysbenchScore),
};

for (const line of lines) {
  const m = line.match(/^(.+)\s+([0-9.]+) (.s)\/iter\s+\((.+) (.s) … (.+) (.s)\)(.+)$/);
  if (m === null) continue;

  ret.push({
    name: m[1].trim(),
    value: Math.round(parseFloat(m[2]) * unitMultiplier[m[3] as keyof typeof unitMultiplier]),
    range: `${Math.round(parseFloat(m[4]) * unitMultiplier[m[5] as keyof typeof unitMultiplier] * 100) / 100} … ${
      Math.round(parseFloat(m[6]) * unitMultiplier[m[7] as keyof typeof unitMultiplier] * 100) / 100
    }`,
    unit: "ns/iter",
  });
}

await Deno.writeTextFile("output.txt", JSON.stringify(ret, undefined, 2));
