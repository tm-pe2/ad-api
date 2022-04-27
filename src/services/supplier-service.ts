import {execute} from "../utils/mysql.connector";
import {Supplier} from "../classes/supplier";
import {supplierQueries} from "../queries/supplier-queries";

export const getAllSuppliers = async () => {
    return execute<Supplier[]>(supplierQueries.getAllSuppliers, []);
};

export const getSupplierById = async (id: Supplier['SupplierID']) => {
    return execute<Supplier>(supplierQueries.getSupplierById, [id]);
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
