import {execute} from "../utils/mysql.connector";
import {Meter} from '../classes/meters';
import {metersQueries} from '../queries/meters-queries';

export function getAllMeters(): Promise<Meter[]> {
    const promise = new Promise<Meter[]>((resolve,reject) => {
        execute<Meter[]>(metersQueries.getAllMeters, []).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No meters!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function getMeterById(id: Meter['meter_id']): Promise<Meter> {
    const promise = new Promise<Meter>((resolve,reject) => {
        execute<Meter>(metersQueries.getMeterById, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No meters!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function getMeterByPhysicalId(id: Meter['physical_id']): Promise<Meter> {
    const promise = new Promise<Meter>((resolve,reject) => {
        execute<Meter>(metersQueries.getMeterByPhysicalId, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No meters!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function insertMeter(meter: Meter): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(metersQueries.addMeter, [
            meter.meter_type,
            meter.physical_id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Meter could not be added!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function updateMeter(meter: Meter): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(metersQueries.updateMeter, [
            meter.meter_type,
            meter.physical_id,
            meter.meter_id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Meter could not be updated!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
}

export function deleteMeter(id: Meter['meter_id']): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(metersQueries.deleteMeter, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Meter could not be deleted!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
}