import { City } from "../classes/city"
import { cityQueries } from "../queries/city-queries";
import { execute } from "../utils/mysql.connector"

export const getAllCities = async () => {
  const cities = execute<City>(cityQueries.getAllCities, [], "rows");
  return cities;
}