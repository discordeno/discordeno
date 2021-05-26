interface Info {
  root: string;
  modules: {
    specifier: string;
    dependencies: { specifier: string }[];
  }[];
}

const info = JSON.parse(
  new TextDecoder().decode(await Deno.readAll(Deno.stdin)),
) as Info;

const dependencyMap = new Map(info.modules.map(
  (module) => [
    module.specifier,
    module.dependencies.map(({ specifier }) =>
      new URL(specifier, module.specifier).href
    ),
  ],
));

const walking = new Set<string>();
const walked = new Set<string>();
function walk(module: string) {
  walking.add(module);
  for (const dependency of dependencyMap.get(module)!) {
    if (walking.has(dependency)) {
      // Reporting cycle.
      const cycleArray = [...walking];
      const cycleIndex = cycleArray.indexOf(dependency);
      cycleArray.splice(0, cycleIndex);
      cycleArray.push(dependency);
      console.log(`🔁 ${cycleArray.join(" \n=> ")}`);
      console.log(`🔁 ${cycleArray.join("=========")}`);
    } else if (!walked.has(dependency)) {
      walk(dependency);
    }
  }
  walking.delete(module);
  walked.add(module);
}
walk(info.root);
