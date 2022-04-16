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
        const validationResult = await addressSchema.validateAsync(req.body);
        let address: Address = validationResult;
        const result = await addressService.insertAddress(address);
        res.status(200).json({result});

    } catch (errors) {
        console.log(errors);
        if(errors)
        res.status(500).json({
            message: 'There was an error when updating address!'
        });
    }
};

export const updateAddress: RequestHandler = async (req: Request, res: Response) => {
    try {
        const validationResult = await addressSchema.validateAsync(req.body);
        let address: Address = validationResult;
        const result = await addressService.updateAddress(address);

        res.status(200).json({
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when updating address!'
        });
    }
};

export const deleteAddressById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const result = await addressService.deleteAddressById(Number(req.params.id));

        res.status(200).json({
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when deleting customer'
        });
    }
};
