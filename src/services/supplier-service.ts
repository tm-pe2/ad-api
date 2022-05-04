import {execute} from "../utils/mysql.connector";
import {Supplier} from "../classes/supplier";
import {supplierQueries} from "../queries/supplier-queries";

export const getAllSuppliers = async () => {
    let suppliers = execute<{rows: Supplier[]}>(supplierQueries.getAllSuppliers, []);
    console.log(suppliers);
    return (await suppliers).rows;
};

export const getSupplierById = async (id: Supplier['SupplierID']) => {
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
        supplier.Name,
        supplier.SupplyType,
        supplier.CompanyName,
        supplier.AdressID,
        supplier.SupplierID
    ]);
    return result.rowCount > 0;
};

export const deleteSupplierById = async (id: Supplier['SupplierID']) => {
    const result = await execute<{ rowCount: number }>(supplierQueries.deleteSupplierById, [id]);
    return result.rowCount > 0;
};
