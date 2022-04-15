import {Request, RequestHandler, Response} from 'express';
import {Address} from '../classes/address';
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
        let address: Address = req.body;

        const result = await addressService.insertAddress(req.body);

        res.status(200).json({
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when adding new address'
        });
    }
};

export const updateAddress: RequestHandler = async (req: Request, res: Response) => {
    try {
        let address: Address = req.body;

        const result = await addressService.updateAddress(address);

        res.status(200).json({
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when updating address'
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
