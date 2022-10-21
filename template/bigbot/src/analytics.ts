import { InfluxDB } from "@influxdata/influxdb-client";

const INFLUX_ORG = process.env.DOCKER_INFLUXDB_INIT_ORG as string;
const INFLUX_BUCKET = process.env.DOCKER_INFLUXDB_INIT_BUCKET as string;
const INFLUX_TOKEN = process.env.DOCKER_INFLUXDB_INIT_ADMIN_TOKEN as string;
const INFLUX_URL = process.env.INFLUX_URL as string;

export const influxDB = INFLUX_URL && INFLUX_TOKEN ? new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN }) : undefined;
export const Influx = influxDB?.getWriteApi(INFLUX_ORG, INFLUX_BUCKET);
