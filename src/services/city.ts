import { cityQueries } from "../queries/city";
import { begin, execute } from "../utils/database-connector";

export const getAllCities = async () => {
  const client = await begin();
  const cities = execute(client,cityQueries.getAllCities, []);
  client.release();
  return cities;
}
