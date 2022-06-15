import { Router } from "express";
import { ValidateInterface } from "../classes/validate";
import { Supplier } from "../models/supplier";
import { insertAddress } from "../services/address";
import { getAllSuppliers, getSupplierById, insertSupplier, modifySupplier } from "../services/supplier";
import { begin, commit, connectClient, rollback } from "../utils/database-connector";
import { Logger } from "../utils/logger";

export class SupplierController {
    static router(): Router {
        return Router({caseSensitive: false})
        .get('/', async (req, res, next) => {
            const client = await connectClient();
            getAllSuppliers(client).then((suppliers) => {
                res.send(suppliers);
            })
            .catch((err) => {
                Logger.error(err);
                res.send(500);
            })
            client.release();
        })
        .get('/:id', async (req,res,next) => {
            const id = parseInt(req.params.id)
            if (isNaN(id)) {
                res.sendStatus(400);
                return;
            }
            const client = await connectClient();
            getSupplierById(client, id)
            .then((supplier) => {
                if(supplier){
                    res.send(supplier)
                }
                else{
                    res.send(404)
                }
            })
            .catch((err) => {
                Logger.error(err)
                res.send(500)
            })
            client.release();
        })
        .post('/', async (req,res,next) => {
            const client = await begin();
            try{
                const supplier: Supplier = req.body

                try {
                    ValidateInterface.checkSupplierRegistration(supplier);
                }
                catch (err) {
                    if(err instanceof Error){
                        res.status(400).json({
                            message: err.message
                        });
                    }
                    else{
                        Logger.warn(err);
                        res.sendStatus(400);
                    }
                    return;
                }

                const addressId = await insertAddress(client, supplier.address)
                if(!addressId){
                    throw new Error("Address not inserted")
                }
                supplier.address.id = addressId

                const supplierInserted = await insertSupplier(client,supplier)
                if(!supplierInserted){
                    throw new Error("Supplier not inserted");
                }
                commit(client)
                res.status(200).json({
                    message: "Supplier inserted succesfully"
                })
            }
            catch (error){
                rollback(client);
                if(error instanceof Error){
                    res.status(500).json({
                        message: error.message
                    });
                }
                else{
                    res.status(500).json({
                        message: "Unknown error"
                    });
                }
            }
            client.release();
        })
        .put('/', async (req,res,next) => {
            const client = await begin();
            // similar to the employee controller put method
            try{
                const supplier: Supplier = req.body

                try {
                    ValidateInterface.checkSupplierRegistration(supplier);
                }
                catch (err) {
                    if(err instanceof Error){
                        res.status(400).json({
                            message: err.message
                        });
                    }
                    else{
                        Logger.warn(err);
                        res.sendStatus(400);
                    }
                    return;
                }
                
                if(!supplier.address){
                    res.sendStatus(400)
                    return;
                }
                supplier.address.country = "Belgium"
                const currentSupplier = await getSupplierById(client, supplier.id!);

                if(!currentSupplier){
                    throw new Error("Supplier not found")
                }
                
                supplier.address.id = currentSupplier.address.id
                const supplierEdited = await modifySupplier(client, supplier);
                if(!supplierEdited){
                    throw new Error("Supplier not edited")
                }
                commit(client)
                res.status(200).send("Supplier edited")
            }
            catch (error){
                rollback(client);
                if(error instanceof Error){
                    res.status(500).json({
                        message: error.message
                    });
                }
                else{
                    res.status(500).json({
                        message: "Unknown error"
                    });
                }
            }
            client.release();
        })
    }
}
