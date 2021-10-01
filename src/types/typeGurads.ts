import { Region, regionChoices } from "./generated";
import { includes } from 'lodash';

export const isRegion = (region: string): region is Region => {
    return includes(regionChoices, region);
}