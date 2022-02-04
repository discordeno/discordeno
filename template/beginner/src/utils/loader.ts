import log from "./logger.ts";

// Very important to make sure files are reloaded properly
let uniqueFilePathCounter = 0;
let paths: string[] = [];

/** This function allows reading all files in a folder. Useful for loading/reloading commands, monitors etc */
export async function importDirectory(path: string) {
  path = path.replaceAll("\\", "/");
  const files = Deno.readDirSync(Deno.realPathSync(path));
  const folder = path.substring(path.indexOf("/src/") + 5);

  if (!folder.includes("/")) log.info(`Loading ${folder}...`);

  for (const file of files) {
    if (!file.name) continue;

    const currentPath = `${path}/${file.name}`;
    if (file.isFile) {
      if (!currentPath.endsWith(".ts")) continue;
      paths.push(
        `import "${Deno.mainModule.substring(0, Deno.mainModule.lastIndexOf("/"))}/${
          currentPath.substring(
            currentPath.indexOf("src/"),
          )
        }#${uniqueFilePathCounter}";`,
      );
      continue;
    }

    await importDirectory(currentPath);
  }

  uniqueFilePathCounter++;
}

/** Imports all everything in fileloader.ts */
export async function fileLoader() {
  await Deno.writeTextFile(
    "fileloader.ts",
    paths.join("\n").replaceAll("\\", "/"),
  );
  await import(
    `${Deno.mainModule.substring(0, Deno.mainModule.lastIndexOf("/"))}/fileloader.ts#${uniqueFilePathCounter}`
  );
  paths = [];
}
