import { BigString } from "../typings.ts";

export class Permission {
    allow: bigint;
    deny: bigint;
    
    constructor(allow: BigString | number, deny: BigString | number= 0) {
        this.allow = BigInt(allow);
        this.deny = BigInt(deny);
    }
}

export default Permission;
