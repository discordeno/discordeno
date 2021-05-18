import { camelize, snakelize } from "../../util/utils.ts";

export class Base {
    /** Converts an object to camelCase */
    camelize<T>(obj: Record<string, unknown> | Record<string, unknown>[]): T {
        return camelize(obj);
    }

    snakeize<T>(obj: Record<string, unknown> | Record<string, unknown>[]): T {
        return snakelize(obj);
    }
}

export default Base;