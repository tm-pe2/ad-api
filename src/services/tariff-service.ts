import {execute} from "../utils/mysql.connector";
import {Tariff} from "../classes/tariff";
import {tariffQueries} from "../queries/tariff-queries";

export const getAllTariffs = async () => {
    let tariffs = execute<{rows: Tariff[]}>(tariffQueries.getAllTariffs, []);
    console.log(tariffs);
    return (await tariffs).rows;
};

export const getTariffById = async (id: Tariff['tariff_id']) => {
    let tariff = execute<{rows: Tariff}>(tariffQueries.getTariffById, [id]);
    console.log(tariff);
    return (await tariff).rows;
};

export const insertTariff = async (tariff: Tariff) => {
    const result = await execute<{ rowCount: number }>(tariffQueries.addTariff, [
        tariff
    ]);
    return result.rowCount > 0;
};

export const updateTariff = async (tariff: Tariff) => {
    const result = await execute<{ rowCount: number }>(tariffQueries.updateTariff, [
        tariff.small_ind,
        tariff.medium_ind,
        tariff.big_ind,
        tariff.small_comp,
        tariff.medium_comp,
        tariff.big_comp,
        tariff.tariff_id
    ]);
    return result.rowCount > 0;
};

export const deleteTariffById = async (id: Tariff['tariff_id']) => {
    const result = await execute<{ rowCount: number }>(tariffQueries.deleteTariffById, [id]);
    return result.rowCount > 0;
};
