import { ApplicationCommandOption } from "../../src/types/interactions/application_command_option.ts";
import { DiscordApplicationCommandOptionTypes } from "../../src/types/interactions/application_command_option_types.ts";
import {
  camelKeysToSnakeCase,
  snakeKeysToCamelCase,
  validateSlashCommands,
} from "../../src/util/utils.ts";
import { assertEquals, assertThrows } from "../deps.ts";

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
    testTheId: "123123123123",
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

Deno.test({
  name: "[utils] validateSlashCommands(): invalid name",
  fn() {
    assertThrows(() =>
      validateSlashCommands([{
        // The maximum length of the name of an application command is 32.
        name: "a".repeat(33),
      }])
    );
  },
});

Deno.test({
  name: "[utils] validateSlashCommands(): invalid description",
  fn() {
    assertThrows(() =>
      // The maximum length of the description of an application command is 100.
      validateSlashCommands([{ description: "a".repeat(101) }])
    );
  },
});

Deno.test({
  name: "[utils] validateSlashCommands(): invalid number of options",
  fn() {
    // The maximum number of options an application command can "accomodate" is 25.
    const options: ApplicationCommandOption[] = Array(26).fill({
      name: "option1",
      description: "The description of the application command's option.",
      type: DiscordApplicationCommandOptionTypes.STRING,
    });

    assertThrows(() => validateSlashCommands([{ options }]));
  },
});
