import { loadPage, text } from "./utils";
import { selectAll } from 'css-select';

export const fetchRegions = async (): Promise<string[]> => {
    const document = await loadPage('/Calendrier.aspx');
    const result = selectAll('select[id=ctl00_ContentPlaceHolderMain_SelectRegion] > option', document);
    const options: string[] = []; 
    result.forEach(item => options.push(text(item)));
    return options;
}