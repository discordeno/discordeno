import { loopObject } from "../../src/util/loop_object.ts";
import { assertEquals } from "../deps.ts";

const objWithBigints = {
  a: BigInt(0),
  b: "string",
  c: 123,
  d: [123],
  e: {
    f: 123,
    g: BigInt(2),
  },
  h: null,
  i: undefined,
  j: 0,
  //   k: function () {
  //     return true;
  //   },
};

const correctlyConverted = {
  a: "0",
  b: "string",
  c: 123,
  d: [123],
  e: {
    f: 123,
    g: "2",
  },
  h: null,
  i: undefined,
  j: 0,
  //   k: function () {
  //     return true;
  //   },
};

Deno.test({
  name: "[utils] loop over an object with a handler",
  fn() {
    const converted = loopObject(
      objWithBigints,
      (value) =>
        typeof value === "bigint"
          ? value.toString()
          : Array.isArray(value)
          ? value.map((v) => (typeof v === "bigint" ? v.toString() : v))
          : value,
      `Running for loop in unit test function for changing bigints to strings.`
    );

    assertEquals(converted, correctlyConverted);
  },
});
