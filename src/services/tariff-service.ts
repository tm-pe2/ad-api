import {execute} from "../utils/mysql.connector";
import {Tariff} from "../classes/tariff";
import {tariffQueries} from "../queries/tariff-queries";

export const getAllTariffs = async () => {
    return execute<Tariff[]>(tariffQueries.getAllTariffs, []);
};

export const getTariffById = async (id: Tariff['tariffId']) => {
    return execute<Tariff>(tariffQueries.getTariffById, [id]);
};

export const insertTariff = async (tariff: Tariff) => {
    const result = await execute<{ affectedRows: number }>(tariffQueries.addTariff, [
        tariff.toJSON()
    ]);
    return result.affectedRows > 0;
};

export const updateTariff = async (tariff: Tariff) => {
    const result = await execute<{ affectedRows: number }>(tariffQueries.updateTariff, [
        tariff.smallInd,
        tariff.mediumInd,
        tariff.bigInd,
        tariff.smallComp,
        tariff.mediumComp,
        tariff.bigComp,
        tariff.tariffId
    ]);
    return result.affectedRows > 0;
};

export const deleteTariffById = async (id: Tariff['tariffId']) => {
    const result = await execute<{ affectedRows: number }>(tariffQueries.deleteTariffById, [id]);
    return result.affectedRows > 0;
};
