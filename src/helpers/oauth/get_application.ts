import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";
import { Application } from "../../types/applications/application.ts";

/** Get the applications info */
export async function getApplicationInfo() {
  return await rest.runMethod<Omit<Application, "flags">>("get", endpoints.OAUTH2_APPLICATION);
}
