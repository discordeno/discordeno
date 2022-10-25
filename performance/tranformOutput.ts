const output = await Deno.readTextFile("output.txt");
const lines = output.split(/\r?\n/g);

const ret = [];

const unitMultiplier = {
  "s": 1000 * 1000 * 1000,
  "ms": 1000 * 1000,
  "µs": 1000,
  "ns": 1,
};

for (const line of lines) {
  const m = line.match(/^(.+)\s+([0-9.]+) (.s)\/iter\s+\((.+) .s … (.+) .s\)(.+)$/);
  if (m === null) continue;

  ret.push({
    name: m[1].trim(),
    value: Math.round(parseFloat(m[2]) * unitMultiplier[m[3] as keyof typeof unitMultiplier]),
    range: Math.round(
      (parseFloat(m[6].replace(/\s+/g, " ").trim().split(" ")[2]) -
        parseFloat(m[6].replace(/\s+/g, " ").trim().split(" ")[0])) *
        unitMultiplier[m[3] as keyof typeof unitMultiplier],
    ),
    unit: "ns/iter",
  });
}

await Deno.writeTextFile("output.txt", JSON.stringify(ret, undefined, 2));
