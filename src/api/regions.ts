import { loadPage } from "./utils";

export const fetchRegions = async (): Promise<string[]> => {
    const document = await loadPage('/Calendrier.aspx');
    const result = document.querySelectorAll('select[id=ctl00_ContentPlaceHolderMain_SelectRegion] > option');
    const options: string[] = []; 
    result.forEach(item => options.push(item.textContent));
    return options;
}