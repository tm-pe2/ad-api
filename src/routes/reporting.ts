import express from "express";
import { getUnpaidInvoices } from "../controllers/reporting";

const reportingRoutes = express.Router();
reportingRoutes.get('/reporting/tariffs', getUnpaidInvoices);

export = reportingRoutes;
