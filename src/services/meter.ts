import {execute} from "../utils/database-connector";
import { Customer } from "../models/user";
import { PoolClient } from "pg";
import { contractQueries } from "../queries/contract";
import { Contract } from "../models/contract";
import { MeterType, ServiceType } from "../models/estimation";
import { meterQueries } from "../queries/meters";
import { instance } from "gaxios";

export async function addNewMeter(client:PoolClient,
    contractId: number, meterType: MeterType): Promise<number | null> {
    const meterRes = await execute(client, meterQueries.insertMeter, [
        meterType
    ]);
    if (meterRes.rowCount === 0) return null;

    const contractRes = await execute(client, meterQueries.insertContractMeter, [
        contractId, meterRes.rows[0].id
    ]);
    if (contractRes.rowCount === 0) return null;

    return meterRes.rows[0].id;
}

export async function generateSmartMeter(occupants: number, day_consumption: number) : Promise<number> {
    // function to generate smart meter in the API from the AI team to simulate an actual smart meter
    // returns the physical id for the smart meter = the id the meter has in the smartmeter API
    let meter = {
          occupants : occupants,
          day_consumption : day_consumption,
          night_consumption : 0,
          latitude: 50.5039,
          longitude: 4.4699
    }
    
    let meter_data = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(meter)
    }

    let device = {
      device: 4,
      on: true
    }

    let device_data = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(device)
    }

    let generated_meterid: number = 0;

    return new Promise<number>((resolve, reject) => {
        fetch("http://10.97.0.100:3000/meter", meter_data)
        .then((response: any) => {
            generated_meterid = response.id;
            console.log("smart meter generated: ", generated_meterid);
            fetch("http://10.97.0.100:3000/meter/" + generated_meterid + "/device", device_data)
            .then(() => {
                console.log("general consumption device added");
                resolve(generated_meterid);
            })
            .catch((error: any) => {
                console.log(error);
                reject();
            })
        })
        .catch((error: any) => {
            console.log(error);
            reject();
        })
    })
}

export async function getSmartMeterValue(physical_id: number) : Promise<number> {
    let request = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
    }

    let index_value: number = 0;
    

    return new Promise<number>(async (resolve, reject) => {
        fetch("http://10.97.0.100:3000/meter/" + physical_id + "/update", request)
        .then((response: any) => {
            index_value = response['last_data_point']['day_consumption'];
            resolve(index_value);
        })
    })
}
