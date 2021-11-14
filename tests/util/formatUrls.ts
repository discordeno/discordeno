import { formatImageURL } from "../../src/util/utils.ts";
import { assertEquals } from "../deps.ts";

Deno.test({
  name: "[utils] format image url",
  fn() {
    assertEquals(formatImageURL(`https://skillz.is.pro`), "https://skillz.is.pro.jpg?size=128");
    assertEquals(formatImageURL(`https://skillz.is.pro`, 1024), "https://skillz.is.pro.jpg?size=1024");
    assertEquals(formatImageURL(`https://skillz.is.pro`, 1024, "gif"), "https://skillz.is.pro.gif?size=1024");
    assertEquals(formatImageURL(`https://skillz.is.pro`, undefined, "gif"), "https://skillz.is.pro.gif?size=128");
  },
});
