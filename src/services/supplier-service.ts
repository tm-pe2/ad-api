import {execute} from "../utils/mysql.connector";
import {Supplier} from "../classes/supplier";
import {supplierQueries} from "../queries/supplier-queries";

export const getAllSuppliers = async () => {
    return execute<Supplier[]>(supplierQueries.getAllSuppliers, []);
};

export const getSupplierById = async (id: Supplier['supplierId']) => {
    return execute<Supplier>(supplierQueries.getSupplierById, [id]);
};

export const insertSupplier = async (supplier: Supplier) => {
    const result = await execute<{ affectedRows: number }>(supplierQueries.addSupplier, [
        supplier.toJSON()
    ]);
    return result.affectedRows > 0;
};

export const updateSupplier = async (supplier: Supplier) => {
    const result = await execute<{ affectedRows: number }>(supplierQueries.updateSupplier, [
        supplier.name,
        supplier.supplyType,
        supplier.companyName,
        supplier.addressId,
        supplier.supplierId
    ]);
    return result.affectedRows > 0;
};

export const deleteSupplierById = async (id: Supplier['supplierId']) => {
    const result = await execute<{ affectedRows: number }>(supplierQueries.deleteSupplierById, [id]);
    return result.affectedRows > 0;
};
