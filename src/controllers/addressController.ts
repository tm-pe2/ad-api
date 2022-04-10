import {NextFunction, Request, RequestHandler, Response} from 'express';
import {Address} from '../classes/address';
import * as AddressService from '../services/addressService';

export const getAllAddresses: RequestHandler = async (req: Request, res: Response) => {
    try {
        const addresses = await AddressService.getAllAddresses();

        res.status(200).json({
            addresses
        });
    } catch (error) {
        console.error('[AddressController][getAllAddresses][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: 'There was an error when fetching addresses'
        });
    }
};

export const getAddressById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const address = await AddressService.getAddressById(Number(req.params.id));

        res.status(200).json({
            address
        });
    } catch (error) {
        console.error('[addressContorller][getAddressId][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: 'There was an error when fetching address'
        });
    }
};

export const addAddress: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let obj = req.body //["address"]; !! device which way to use (-> postman or test)
        let address: Address = new Address(obj.City, obj.Street, obj.HouseNumber, obj.postalCode, obj.Country); // to run validations
        const result = await AddressService.insertAddress(address);

        res.status(200).json({
            result
        });
    } catch (error) {
        next(error);
        //console.error('[addressController][addAddress][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: 'There was an error when adding new address'
        });
    }
};

export const updateAddress: RequestHandler = async (req: Request, res: Response) => {
    try {
        let obj = req.body
        let address: Address = new Address(obj.City, obj.Street, obj.HouseNumber, obj.postalCode, obj.Country, Number(obj.AdressID));// to run validations

        const result = await AddressService.updateAddress(address);

        res.status(200).json({
            result
        });
    } catch (error) {
        console.error('[addressController][updateAddress][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: 'There was an error when updating address'
        });
    }
};

export const deleteAddressById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const result = await AddressService.deleteAddressById(Number(req.params.id));

        res.status(200).json({
            result
        });
    } catch (error) {
        console.error('[customerController][DeleteCustomerById][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: 'There was an error when deleting customer'
        });
    }
};
