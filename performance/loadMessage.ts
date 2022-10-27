const input = Deno.env.get('INPUT')!;

console.log(Deno.env.toObject())

const match = input.match(/body: (.*?)+\n([\S\s]*?)  reaction/)

console.log(match[0].slice(6, -12))