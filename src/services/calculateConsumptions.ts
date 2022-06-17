import { PoolClient } from "pg";
import {addConsumption, getContractIdByMeterId, getIndexValueById} from "./index-value";
import { connectClient } from "../utils/database-connector";
import { Logger } from "../utils/logger";

export async function calcConsumptionsMeter(id: number) {
    const limit = 10000000;
    let actualConsumption = 0;
    const client = await connectClient();

    try {
        let values = await getIndexValueById(client, id);

        if (values && values.length > 1) {

            let prevValue = values[0].index_value;
            let currentValue = values[1].index_value;
            let meter_id = values[0].meter_id;

            let exportData: Array<number | Date> = [];
            exportData[0] = meter_id;
            exportData[2] = new Date();

            if (currentValue < prevValue) {
                let beforeTurnOver = limit - prevValue;
                actualConsumption = currentValue + beforeTurnOver;
                exportData[1] = actualConsumption;
            }
            else {
                actualConsumption = currentValue - prevValue;
                exportData[1] = actualConsumption;
            }

            exportData[1] = Math.round(exportData[1]);

            const output = await addConsumption(client, exportData);


            if (!output) {
                throw new Error("Couldn't add the consumption");
            }
        }
        else{
            throw new Error("couldn't get contract id");
        }
        
        client.release();
            }
    else{
        throw new Error("Could not load the index values");
    }
        
    }
    catch (error) {
        // Bad error handling Xander...
        Logger.error(error);
    }

    client.release();
}
