import api from "../api";
import { writeFileSync } from 'fs';

const generatedTypesPath = './src/types/generated.ts';

const main = async () => {
    const regions = await api.fetchRegions();
    writeFileSync(generatedTypesPath,
`
export const regionChoices = <const>${JSON.stringify(regions)}
export type Region = typeof regionChoices[number]
`);
}

main().catch(console.error);