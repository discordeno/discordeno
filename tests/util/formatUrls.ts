import { formatImageURL } from "../../src/util/utils.ts";
import { assertEquals } from "../deps.ts";

Deno.test({
  name: "[utils] format image url",
  fn() {
    assertEquals(formatImageURL(`https://skillz.com`), "https://skillz.com.jpg?size=128");
    assertEquals(formatImageURL(`https://skillz.com`, 1024), "https://skillz.com.jpg?size=1024");
    assertEquals(formatImageURL(`https://skillz.com`, 1024, "gif"), "https://skillz.com.gif?size=1024");
    assertEquals(formatImageURL(`https://skillz.com`, undefined, "gif"), "https://skillz.com.gif?size=128");
  },
});
