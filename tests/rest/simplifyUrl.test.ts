import { simplifyUrl } from "../../mod.ts";
import { assertEquals, describe, it } from "../deps.ts";

describe("[rest] simplifyUrl", {
  ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
}, () => {
  describe("id", () => {
    it("Will change id to skillzPrefersID (channel, guild, message, messages)", () => {
      assertEquals(simplifyUrl("/messages/555555555555555555", "PUT"), "/messages/skillzPrefersID");
      assertEquals(simplifyUrl("/users/555555555555555555", "PUT"), "/users/skillzPrefersID");
      assertEquals(simplifyUrl("/webhooks/555555555555555555", "PUT"), "/webhooks/skillzPrefersID");
      assertEquals(simplifyUrl("/channel/555555555555555555", "PUT"), "/channel/skillzPrefersID");
      assertEquals(simplifyUrl("/guild/555555555555555555", "PUT"), "/guild/skillzPrefersID");
    });

    it("Will not change id to skillzPrefersID (channels, guilds)", () => {
      assertEquals(simplifyUrl("/channels/555555555555555555", "PUT"), "/channels/555555555555555555");
      assertEquals(simplifyUrl("/guilds/555555555555555555", "PUT"), "/guilds/555555555555555555");
    });
  });

  describe("/reactions", () => {
    it("Will remove path after reactions", () => {
      assertEquals(
        simplifyUrl("/channels/555555555555555555/reactions/555555555555555555/wdiubaibfwuabfobaowbfoibnion", "PUT"),
        "/channels/555555555555555555/reactions",
      );
    });
  });

  describe("/messages", () => {
    it("Will add method in front route if method is DELETE", () => {
      assertEquals(
        simplifyUrl("/channels/555555555555555555/messages/555555555555555555", "DELETE"),
        "DELETE/channels/555555555555555555/messages/skillzPrefersID",
      );
    });

    it("Will not add method in front route", () => {
      assertEquals(
        simplifyUrl("/channels/555555555555555555/messages/555555555555555555", "POST"),
        "/channels/555555555555555555/messages/skillzPrefersID",
      );
      assertEquals(
        simplifyUrl("/channels/555555555555555555/messages/555555555555555555", "GET"),
        "/channels/555555555555555555/messages/skillzPrefersID",
      );
      assertEquals(
        simplifyUrl("/channels/555555555555555555/messages/555555555555555555", "PUT"),
        "/channels/555555555555555555/messages/skillzPrefersID",
      );
    });
  });
});
