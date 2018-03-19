import keyBy from "lodash/keyBy";
import {RESOURCES_PACKS} from "../Constants/resources";

const Multipliers = keyBy(RESOURCES_PACKS, pack => pack.label);
export const countTotalResources = resources => {
    if (!resources) return 0;
    return resources.reduce(
        (acc, curr) => {
            return acc + curr.quantity * Multipliers[curr.label].multiplier
        }, 0
    );
};