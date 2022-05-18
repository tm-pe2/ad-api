import {Request, RequestHandler, Response} from 'express';
import {Address, addressSchema} from '../classes/address';
import * as addressService from '../services/address-service';

export const getAllAddresses: RequestHandler = async (req: Request, res: Response) => {
    try {
        const addresses = await addressService.getAllAddresses();

        res.status(200).json({
            addresses
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching addresses'
        });
    }
};

export const getAddressById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const address = await addressService.getAddressById(Number(req.params.id));
        res.status(200).json({
            address
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching address'
        });
    }
};

export const addAddress: RequestHandler = async (req: Request, res: Response) => {
    try {
        //validate the request body
        const addAddressSchema = addressSchema.fork('address_id', field => field.optional());
        let address: Address = await addAddressSchema.validateAsync(req.body);

        if(await addressService.insertAddress(address))
        {
            res.status(200).json({
                message: "Address inserted succesfully!"
            });
        }
        else
        {
            res.status(401).json({
                message: "An error occured!"
            });
        }
        
    } catch (errors) {
        console.log(errors);
        if(errors)
        res.status(500).json({
            message: 'There was an error when inserting address!'
        });
    }
};

export const updateAddress: RequestHandler = async (req: Request, res: Response) => {
    try {
        let address: Address = await addressSchema.validateAsync(req.body);

        if(await addressService.updateAddress(address))
        {
            res.status(200).json({
                message: "Address updated succesfully!"
            });
        }
        else
        {
            res.status(401).json({
                message: "An error occured!"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when updating address!'
        });
    }
};

export const deleteAddressById: RequestHandler = async (req: Request, res: Response) => {
    try {

        if(await addressService.deleteAddressById(Number(req.params.id)))
        {
            res.status(200).json({
                message: "Address deleted succesfully!"
            });
        }
        else
        {
            res.status(401).json({
                message: "An error occured!"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when deleting customer'
        });
    }
};
