import {execute} from "../utils/mysql.connector";
import {CustomerContracts} from '../classes/customer-contracts';
import {customerContractsQueries} from '../queries/customer-contracts-queries';
//import {AdvanceInvoiceData} from "../classes/invoice_generation/advannjpm ce-invoice-data";

export const getAllCustomersContracts = async () => {
    return await execute<CustomerContracts[]>(customerContractsQueries.getAllCustomerContracts, [], "rows");
};

export const getContractsByCustomerId = async (id: CustomerContracts['customer_id']) => {
    return await execute<CustomerContracts[]>(customerContractsQueries.getContractsByCustomerId, [id], "rows");
};

export const insertCustomerContract = async (idCustomer: number, idContract: number) => {
    const rowCount = await execute<number>(customerContractsQueries.addCustomerContract, [
        idCustomer,
        idContract
    ], "rowCount");

    return rowCount;
};

export const updateContractMeters = async (idCustomer: number, idContract: number) => {
    const rowCount = await execute<number>(customerContractsQueries.addCustomerContract, [
        idCustomer,
        idContract
    ], "rowCount");

    return rowCount;
}

export const deleteContractMeters = async (id: CustomerContracts['contract_id']) => {
    const rowCount = await execute<number>(customerContractsQueries.deleteCustomerContractById, [id], "rowCount");
    return rowCount > 0;
}

// export const getAdvanceInvoiceData = async (id: CustomerContracts['contract_id']) => {
//     return await execute<AdvanceInvoiceData[]>(customerContractsQueries.getAdvanceInvoiceData, [id], "rows");
// };
