import {Request, RequestHandler, Response} from 'express';
import { getAllUnpaidInvoices } from "../services/reporting";

export const getUnpaidInvoices: RequestHandler = async (req: Request, res: Response) => {
    try {
        const invoice = await getAllUnpaidInvoices();

        res.status(200).json({
            invoice
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching estimations'
        });
    }
};
