import {execute} from "../utils/mysql.connector";
import {Tariff} from "../classes/tariff";
import {tariffQueries} from "../queries/tariff-queries";

export const getAllTariffs = async () => {
    return execute<Tariff[]>(tariffQueries.getAllTariffs, []);
};

export const getTariffById = async (id: Tariff['TarifID']) => {
    return execute<Tariff>(tariffQueries.getTariffById, [id]);
};

export const insertTariff = async (tariff: Tariff) => {
    const result = await execute<{ rowCount: number }>(tariffQueries.addTariff, [
        tariff
    ]);
    return result.rowCount > 0;
};

export const updateTariff = async (tariff: Tariff) => {
    const result = await execute<{ rowCount: number }>(tariffQueries.updateTariff, [
        tariff.SmallInd,
        tariff.MediumInd,
        tariff.BigInd,
        tariff.SmallComp,
        tariff.MediumComp,
        tariff.BigComp,
        tariff.TarifID
    ]);
    return result.rowCount > 0;
};

export const deleteTariffById = async (id: Tariff['TarifID']) => {
    const result = await execute<{ rowCount: number }>(tariffQueries.deleteTariffById, [id]);
    return result.rowCount > 0;
};
