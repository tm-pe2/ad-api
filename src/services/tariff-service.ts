import {execute} from "../utils/database-connector";
import {Tariff} from "../classes/tariff";
import {tariffQueries} from "../queries/tariff-queries";

export const getAllTariffs = async () => {
    return await execute<Tariff[]>(tariffQueries.getAllTariffs, [], "rows");
};

export const getTariffById = async (id: Tariff['tariff_id']) => {
    const tariffs = await execute<Tariff[]>(tariffQueries.getTariffById, [id], "rows");
    return tariffs[0];
};

export const insertTariff = async (tariff: Tariff) => {
    const rowCount = await execute<number>(tariffQueries.addTariff, [
        tariff.customer_type,
        tariff.value
    ], "rowCount");

    return rowCount > 0;
};

export const updateTariff = async (tariff: Tariff) => {
    const rowCount = await execute<number>(tariffQueries.updateTariff, [
        tariff.customer_type,
        tariff.value,

        tariff.tariff_id
    ], "rowCount");

    return rowCount > 0;
};

export const deleteTariffById = async (id: Tariff['tariff_id']) => {
    const rowCount = await execute<number>(tariffQueries.deleteTariffById, [id], "rowCount");
    return rowCount > 0;
};
