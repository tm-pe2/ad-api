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
    let res = await execute(client, supplierQueries.insertSupplier, [supplier.id, supplier.company_name,supplier.service_type,supplier.vat_number, supplier.address.id]);
    return res.rowCount > 0;
}