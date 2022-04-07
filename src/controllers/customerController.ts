import { NextFunction, Request, RequestHandler, Response } from 'express';
import { Customer } from '../classes/customer';
import * as CustomerService from '../services/customerService';

export const getAllCustomers: RequestHandler = async (req: Request, res: Response) => {
  try {
    const customers = await CustomerService.getAllCustomers();

    res.status(200).json({
      customers
    });
  } catch (error) {
    console.error('[customerController][getCustomers][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when fetching customers'
    });
  }
};

export const getCustomerById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const customer = await CustomerService.getCustomerById(Number(req.params.id));

    res.status(200).json({
      customer
    });
  } catch (error) {
    console.error('[customerController][getCustomerById][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when fetching customer'
    });
  }
};

export const addCustomer: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let obj = req.body //["customer"]; !! device which way to use (-> postman or test)
    let customer: Customer = new Customer(obj.FirstName, obj.LastName, obj.BirthDate, Number(obj.AdressID), obj.Email, obj.PhoneNumber, obj.Password); // to run validations
    const result = await CustomerService.insertCustomer(customer);

    res.status(200).json({
      result
    });
  } catch (error) {
    next(error);
    //console.error('[customerController][addCustomer][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when adding new customer'
    });
  }
};

export const updateCustomer: RequestHandler = async (req: Request, res: Response) => {
  try {
    let obj = req.body //["customer"]; !! decide which way to use (-> postman or test)
    let c: Customer = new Customer(obj.FirstName, obj.LastName, obj.BirthDate, Number(obj.AdressID), obj.Email, obj.PhoneNumber, obj.Password, Number(obj.ClientID));// to run validations

    const result = await CustomerService.UpdateCustomer(c);

    res.status(200).json({
      result
    });
  } catch (error) {
    console.error('[customerController][updateCustomer][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when updating customer'
    });
  }
};

export const DeleteCustomerById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const result = await CustomerService.deleteCustomer(Number(req.params.id));

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
