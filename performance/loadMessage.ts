const input = Deno.env.get('INPUT')!;

const match = input.match(/body: (.*?)+\n([\S\s]*?)  reaction/)

console.log(match[0].slice(6, -12))