const input = Deno.env.get('input')!;

const match = input.match(/body: (.*?)+\n([\S\s]*?)  reaction/)

console.log(match[0].slice(6, -12))