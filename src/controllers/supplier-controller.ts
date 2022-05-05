import {Request, RequestHandler, Response} from 'express';
import {Supplier, supplierSchema} from '../classes/supplier';
import * as supplierService from '../services/supplier-service';

export const getAllSuppliers: RequestHandler = async (req: Request, res: Response) => {
    try {
        const suppliers = await supplierService.getAllSuppliers();

        res.status(200).json({
            suppliers
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching suppliers'
        });
    }
};

export const getSupplierById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const supplier = await supplierService.getSupplierById(Number(req.params.id));

        res.status(200).json({
            supplier
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching supplier'
        });
    }
};

export const addSupplier: RequestHandler = async (req: Request, res: Response) => {
    try {
        //validate the request body
        const addSupplierSchema = supplierSchema.fork('supplier_id', field => field.optional());
        let supplier: Supplier = await addSupplierSchema.validateAsync(req.body);

        const result = await supplierService.insertSupplier(supplier);

        res.status(200).json({
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when adding new supplier'
        });
    }
};

export const updateSupplier: RequestHandler = async (req: Request, res: Response) => {
    try {
        //validate the request body
        let supplier: Supplier = await supplierSchema.validateAsync(req.body);

        const result = await supplierService.updateSupplier(supplier);

        res.status(200).json({
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when updating supplier'
        });
    }
};

export const deleteSupplierById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const result = await supplierService.deleteSupplierById(Number(req.params.id));

        res.status(200).json({
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when deleting supplier'
        });
    }
};
