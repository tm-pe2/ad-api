import { PoolClient } from "pg";
import { addConsumption, getContractIdByMeterId, getIndexValueById } from "./index-value";
import { generateAnnualInvoice } from "../utils/generate-invoice-util";
import { getContractById } from "./contract";

export async function calcConsumptionMeter(client: PoolClient, id: number) {

    const limit = 10000000;
    let actualConsumption = 0;

    let values = await getIndexValueById(client, id);
    //console.log("values",values);

    if (values && values.length > 1) {

        let prevValue = values[0].index_value;
        let currentValue = values[1].index_value;
        let meter_id = values[0].meter_id;
        console.log(meter_id);

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

        const output = await addConsumption(client, exportData);
        //console.log(exportData);
        //console.log(output);

        if (!output) {
            throw new Error("Could't add the consumption");
        }
        const contractId = await getContractIdByMeterId(client, meter_id);

        if (contractId) {

            const contract = await getContractById(client, contractId);

            if (contract) { await generateAnnualInvoice(contract); }
        }
        else {
            throw new Error("couldn't get contract id");
        }
    }
    else {
        throw new Error("Could not load the index values");
    }

}
