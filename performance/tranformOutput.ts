const output = await Deno.readTextFile("output.txt");
const lines = output.split(/\r?\n/g);

const ret = [];

for (const line of lines) {
  const m = line.match(/^(.+)\s+([0-9.]+) (.s)\/iter\s+\((.+) .s … (.+) .s\)(.+)$/);
  if (m === null) continue;

  const name = m[1].trim();
  const value = m[2];
  const range = Math.round(
    (parseFloat(m[6].replace(/\s+/g, " ").trim().split(" ")[2]) -
      parseFloat(m[6].replace(/\s+/g, " ").trim().split(" ")[0])) * 10,
  ) / 10;
  const unit = m[3];

  ret.push(`test ${name} ... bench: ${value} ${unit} (+/- ${range})`);
}

await Deno.writeTextFile("output.txt", ret.join("\n"));
