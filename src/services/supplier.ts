import { PoolClient } from "pg";
import { Supplier } from "../models/supplier";
import { supplierQueries } from "../queries/supplier";
import { execute } from "../utils/database-connector";

export async function getAllSuppliers(client: PoolClient): Promise<Supplier[] | null> {
    let res = await execute(client, supplierQueries.getAllSuppliers);
    if (res.rowCount === 0) return null;
    return res.rows as Supplier[];
}

export async function getSupplierById(client: PoolClient, id: number): Promise<Supplier | null> {
    let res = await execute(client, supplierQueries.getSupplierById, [id]);
    if(res.rowCount === 0) return null;
    return res.rows[0] as Supplier;
}

export async function insertSupplier(client: PoolClient, supplier: Supplier): Promise<boolean> {
    let res = await execute(client, supplierQueries.insertSupplier, [ supplier.company_name,supplier.service_type,supplier.vat_number, supplier.address.id]);
    return res.rowCount > 0;
}

export async function modifySupplier(client: PoolClient, supplier: Supplier): Promise<boolean> {
    try {
        await execute(client, supplierQueries.modifySupplier, [
            supplier.id, 
            supplier.company_name,
            supplier.service_type,
            supplier.vat_number,
            supplier.address.id]);

        await execute(client, supplierQueries.modifyAddress, [
            supplier.address.id,
            supplier.address.street,
            supplier.address.house_number,
            supplier.address.city_id,
            supplier.address.country
            ]);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}