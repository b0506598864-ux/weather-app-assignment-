import axios from "axios";
import type { City } from "../types/city-type";

type CityRecord = {
  _id: number;
  city_name_he: string;
  city_name_en: string | null;
};

type CitiesResponse = {
  success: boolean;
  result?: {
    records: CityRecord[];
    total: number;
  };
};

const CITIES_URL = "https://data.gov.il/api/3/action/datastore_search";

const RESOURCE_ID = "8f714b6f-c35c-4b40-a0e7-547b675eee0e";

export async function getCities(): Promise<City[]> {
  const records: CityRecord[] = [];
  const limit = 1000;
  let total = 0;

  do {
    const { data } = await axios.get<CitiesResponse>(CITIES_URL, {
      params: {
        resource_id: RESOURCE_ID,
        limit,
        offset: records.length,
      },
      timeout: 20000,
    });

    if (!data.success || !data.result || !Array.isArray(data.result.records)) {
      throw new Error("לא ניתן לטעון את רשימת היישובים");
    }

    const batch = data.result.records;
    total = data.result.total;

    if (batch.length === 0 && records.length < total) {
      throw new Error("רשימת היישובים התקבלה באופן חלקי");
    }

    records.push(...batch);
  } while (records.length < total);

  return records
    .map((record) => ({
      id: String(record._id),
      nameHe: record.city_name_he.trim(),
      nameEn: (record.city_name_en ?? "").trim(),
    }))
    .sort((a, b) => a.nameHe.localeCompare(b.nameHe, "he"));
}
