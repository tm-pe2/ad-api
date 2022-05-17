import {execute} from "../utils/mysql.connector";
import {Supplier} from "../classes/supplier";
import {supplierQueries} from "../queries/supplier-queries";

export function getAllSuppliers(): Promise<Supplier[]> {
    const promise = new Promise<Supplier[]>((resolve,reject) => {
        execute<Supplier[]>(supplierQueries.getAllSuppliers, []).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No suppliers!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function getSupplierById(id: Supplier['supplier_id']): Promise<Supplier> {
    const promise = new Promise<Supplier>((resolve,reject) => {
        execute<Supplier>(supplierQueries.getSupplierById, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No suppliers!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function getSupplierByVAT(vat: Supplier['vat_number']): Promise<Supplier>{
    const promise = new Promise<Supplier>((resolve,reject) => {
        execute<Supplier>(supplierQueries.getSupplierByVAT, [vat]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No suppliers!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function insertSupplier(supplier: Supplier): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(supplierQueries.addSupplier, [
            supplier.name,
            supplier.supply_type,
            supplier.company_name,
            supplier.address_id,
            supplier.vat_number]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Supplier could not be added!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function updateSupplier(supplier: Supplier): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(supplierQueries.updateSupplier, [
            supplier.name,
            supplier.supply_type,
            supplier.company_name,
            supplier.address_id,
            supplier.vat_number,
            supplier.supplier_id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Supplier could not be updated!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function deleteSupplierById(id: Supplier['supplier_id']): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(supplierQueries.deleteSupplierById, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Supplier could not be deleted!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};
