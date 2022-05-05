import {execute} from "../utils/mysql.connector";
import {Supplier} from "../classes/supplier";
import {supplierQueries} from "../queries/supplier-queries";

export const getAllSuppliers = async () => {
    let suppliers = execute<{rows: Supplier[]}>(supplierQueries.getAllSuppliers, []);
    console.log(suppliers);
    return (await suppliers).rows;
};

export const getSupplierById = async (id: Supplier['supplier_id']) => {
    let supplier = execute<{rows: Supplier}>(supplierQueries.getSupplierById, [id]);
    console.log(supplier);
    return (await supplier).rows;
};

export const insertSupplier = async (supplier: Supplier) => {
    const result = await execute<{ rowCount: number }>(supplierQueries.addSupplier, [
        supplier
    ]);
    return result.rowCount > 0;
};

export const updateSupplier = async (supplier: Supplier) => {
    const result = await execute<{ rowCount: number }>(supplierQueries.updateSupplier, [
        supplier.name,
        supplier.supply_type,
        supplier.company_name,
        supplier.address_id,
        supplier.supplier_id
    ]);
    return result.rowCount > 0;
};

export const deleteSupplierById = async (id: Supplier['supplier_id']) => {
    const result = await execute<{ rowCount: number }>(supplierQueries.deleteSupplierById, [id]);
    return result.rowCount > 0;
};
