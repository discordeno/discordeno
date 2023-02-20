const handlers: {
  [index: string]: any;
} = {};

const topDirs = ["./handlers"];

const readDir = async (dirname: string, onContent: (content: string) => void) => {
  const files: Deno.DirEntry[] = [];
  for (const dirEntry of Deno.readDirSync(dirname)) {
    files.push(dirEntry);
  }
  await Promise.all(
    files.map(async (file) => {
      if (file.isFile) {
        const content = await Deno.readTextFile(dirname + "/" + file.name);
        onContent(content);
        return;
      }
      if (file.isDirectory) await readDir(`${dirname}/${file.name}`, onContent);
    }),
  );
};

await Promise.all(topDirs.map((topDir) =>
  readDir(topDir, (content) => {
    const handler = content.match(/export function [A-z]+\(/g);
    if (handler === null) return;
    const transformers = content.match(/bot.transformers.[A-z]+\(/g);
    const event = content.match(/bot.events.[A-z]+\(/);

    handlers[handler.map((handler) => handler.slice(16, -1))[0]] = {
      transformers: transformers === null ? [] : transformers.map((result) => result.slice(4, -1)),
      event: event === null ? undefined : event.map((result) => result.slice(4, -1))[0],
    };
  })
));

console.log(handlers);
