import {execute} from "../utils/mysql.connector";
import {Supplier} from "../classes/supplier";
import {supplierQueries} from "../queries/supplier-queries";

export const getAllSuppliers = async () => {
    return await execute<Supplier[]>(supplierQueries.getAllSuppliers, [], "rows");
};

export const getSupplierById = async (id: Supplier['supplier_id']) => {
    const suppliers = await execute<Supplier[]>(supplierQueries.getSupplierById, [id], "rows");

    return suppliers[0];
};

export const insertSupplier = async (supplier: Supplier) => {
    const rowCount = await execute<number>(supplierQueries.addSupplier, [
        supplier.name,
        supplier.supply_type,
        supplier.company_name,
        supplier.address_id
    ], "rowCount");

    return rowCount > 0;
};

export const updateSupplier = async (supplier: Supplier) => {
    const rowCount = await execute<number>(supplierQueries.updateSupplier, [
        supplier.name,
        supplier.supply_type,
        supplier.company_name,
        supplier.address_id,

        supplier.supplier_id
    ], "rowCount");

    return rowCount > 0;
};

export const deleteSupplierById = async (id: Supplier['supplier_id']) => {
    const rowCount = await execute<number>(supplierQueries.deleteSupplierById, [id], "rowCount");

    return rowCount > 0;
};
