// select id, city_name, postal_code from cities_postalcodes

const getAllCities = `
    SELECT id, city_name, postal_code from cities_postalcodes
`;
export const cityQueries = {
    getAllCities: getAllCities
}
