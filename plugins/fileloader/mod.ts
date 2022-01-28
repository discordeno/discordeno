import { Bot } from './deps.ts';

// iMpOrTaNt to make sure files can be reloaded properly!
export let uniqueFilePathCounter = 0;
export let paths: string[] = [];

/** Recursively generates an array of unique paths to import using `fileLoader()` 
 * (**Is** windows compatible)
*/
export async function importDirectory(path: string) {
  path = path.replaceAll("\\", "/");
  const files = Deno.readDirSync(Deno.realPathSync(path));

  for (const file of files) {
    if (!file.name) continue;

    const currentPath = `${path}/${file.name}`;
    if (file.isFile) {
      if (!currentPath.endsWith(".ts")) continue;
      paths.push(
        `import "${Deno.mainModule.substring(0, Deno.mainModule.lastIndexOf("/"))}/${currentPath.substring(
          currentPath.indexOf("src/")
        )}#${uniqueFilePathCounter}";`
      );
      continue;
    }

    // Recursive function!
    await importDirectory(currentPath);
  }

  uniqueFilePathCounter++;
}

/** Writes, then imports all everything in fileloader.ts */
export async function fileLoader() {
  await Deno.writeTextFile("fileloader.ts", paths.join("\n").replaceAll("\\", "/"));
  await import(
    `${Deno.mainModule.substring(0, Deno.mainModule.lastIndexOf("/"))}/fileloader.ts#${uniqueFilePathCounter}`
  );
  paths = [];
}

/** This function will import the specified directories */
export async function fastFileLoader(
  /** An array of directories to import recursively. */
  paths: string[],
  /** A function that will run before recursively setting a part of `paths`.
   * `path` contains the path that will be imported, useful for logging
   */
  between?: (path: string, uniqueFilePathCounter: number, paths: string[]) => void,
  /** A function that runs before **actually** importing all the files. */
  before?: (uniqueFilePathCounter: number, paths: string[]) => void
) {
  await Promise.all(
    [...paths].map((path) => {
      if (between) between(path, uniqueFilePathCounter, paths);
      importDirectory(path)
    })
  );

  if (before) before(uniqueFilePathCounter, paths);

  await fileLoader();
}

/** Extend the Bot with the Plugin's added functions */
export interface BotWithFileLoader extends Bot {
  /** Recursively generates an array of unique paths to import using `fileLoader()` 
   * (**Is** windows compatible)
  */
  importDirectory: (path: string) => void,
  /** Writes, then imports all everything in fileloader.ts */
  fileLoader: () => void,
  /** This function will import the specified directories */
  fastFileLoader: (
    /** An array of directories to import recursively. */
    paths: string[],
    /** A function that will run before recursively setting a part of `paths`.
     * `path` contains the path that will be imported, useful for logging
     */
    between?: (path: string, uniqueFilePathCounter: number, paths: string[]) => void,
    /** A function that runs before **actually** importing all the files. */
    before?: (uniqueFilePathCounter: number, paths: string[]) => void
  ) => void,
}

/** Pass in a (compatible) bot instance, and get sweet file loader goodness.
 * Remember to capture the output of this function!
 */
export function enableFileLoaderPlugin(rawBot: Bot): BotWithFileLoader {
  const bot = rawBot as BotWithFileLoader;

  bot.importDirectory = importDirectory;
  bot.fileLoader = fileLoader;
  bot.fastFileLoader = fastFileLoader;

  return bot;
}