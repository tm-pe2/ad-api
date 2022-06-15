// select id, city_name, postal_code from cities_postalcodes

import { TABLES } from "./tables";

const getAllCities = `
    SELECT id, city_name, postal_code from ${TABLES.CITIES}
`;
export const cityQueries = {
    getAllCities: getAllCities
}
