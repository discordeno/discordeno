import { camelKeysToSnakeCase, snakeKeysToCamelCase } from "../../mod.ts";
import { assertEquals } from "../deps.ts";

const testSnakeObject = {
  // deno-lint-ignore camelcase
  hello_world: "hello_world",
  // deno-lint-ignore camelcase
  the_universe: {
    blue_planet: {
      water: "is_blue",
      dirt: "isDirty",
    },
    moon: {
      earth_moon: {
        is_round: true,
      },
      other_moon: {
        is_round: 0,
      },
    },
    arrays: ["one_two", { moo_cow: { boo: true } }],
    test_the_id: "123123123123",
  },
};

const testCamelObject = {
  helloWorld: "hello_world",
  theUniverse: {
    bluePlanet: {
      water: "is_blue",
      dirt: "isDirty",
    },
    moon: {
      earthMoon: {
        isRound: true,
      },
      otherMoon: {
        isRound: 0,
      },
    },
    arrays: ["one_two", { mooCow: { boo: true } }],
    testTheID: "123123123123",
  },
};

const someOther = {
  helloWorld: 1,
};

const someElseOther = {
  // deno-lint-ignore camelcase
  hello_world: 1,
};

Deno.test({
  name: "[utils] convert snake case keys to camel case",
  fn() {
    const result = snakeKeysToCamelCase(testSnakeObject);
    assertEquals(result, testCamelObject);
    const resultTwo = snakeKeysToCamelCase(someOther);
    assertEquals(resultTwo, someOther);
  },
});

Deno.test({
  name: "[utils] convert camel case keys to snake case",
  fn() {
    const result = camelKeysToSnakeCase(testCamelObject);
    assertEquals(result, testSnakeObject);
    const resultTwo = camelKeysToSnakeCase(someElseOther);
    assertEquals(resultTwo, someElseOther);
  },
});
