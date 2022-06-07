/* TODO: Estimation needed? */ 
const selectContractQuery = `
    SELECT
        contracts.id,
        users.id as user_id,
        contracts.start_date,
        contracts.end_date,
        contracts.tariff_id,
        contracts.estimation_id,
        json_build_object(
            'id', addresses.id,
            'street', addresses.street,
            'house_number', addresses.house_number,
            'city_name', cities_postalcodes.city_name,
            'postal_code', cities_postalcodes.postal_code,
            'country', addresses.country
        ) as address
    FROM contracts
    LEFT JOIN addresses ON contracts.address_id = addresses.id
    LEFT JOIN cities_postalcodes ON addresses.city_id = cities_postalcodes.id
    LEFT JOIN customers_contracts ON contracts.id = customers_contracts.contract_id
    LEFT JOIN users ON customers_contracts.user_id = users.id
`

export const contractQueries = {
    getAllContracts: selectContractQuery,
    getContractById: selectContractQuery + `
        WHERE contracts.id = $1
    `,
}
