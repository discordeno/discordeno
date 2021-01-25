import {
  camelKeysToSnakeCase,
  isObject,
  snakeKeysToCamelCase,
} from "../../src/util/utils.ts";
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

Deno.test({
  name: "[utils] isObject",
  fn(): void {
    assertEquals(isObject({ moooo: "loud" }), true);
    assertEquals(isObject([{ moooo: "loud" }, { moooo: "loud" }]), false);
    assertEquals(isObject(["asd"]), false);
    assertEquals(isObject([123]), false);
    assertEquals(isObject([true]), false);
    assertEquals(isObject([[[[[]]]]]), false);
    assertEquals(isObject("string"), false);
    assertEquals(isObject(1532), false);
    assertEquals(isObject(true), false);
    assertEquals(isObject(() => true), false);
  },
});

Deno.test({
  name: "[utils] snakeKeysToCamelCase",
  fn(): void {
    const result = snakeKeysToCamelCase(testSnakeObject);
    assertEquals(result, testCamelObject);
  },
});

Deno.test({
  name: "[utils] camelKeysToSnakeCase",
  fn(): void {
    const result = camelKeysToSnakeCase(testCamelObject);
    assertEquals(result, testSnakeObject);
  },
});
