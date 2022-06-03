import { cityQueries } from "../queries/city-queries";
import { execute } from "../utils/database-connector";

export const getAllCities = async () => {
  const cities = execute(cityQueries.getAllCities, []);
  return cities;
}