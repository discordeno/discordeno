import { InfluxDB } from "@influxdata/influxdb-client";
import { INFLUX_BUCKET, INFLUX_ORG, INFLUX_TOKEN, INFLUX_URL } from "./configs";

export const influxDB = new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN });
export const Influx = influxDB.getWriteApi(INFLUX_ORG, INFLUX_BUCKET);
