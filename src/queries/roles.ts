import { TABLES } from "./tables"

const getAllRoles = `
    SELECT id,name,description FROM ${TABLES.ROLES}
`

export const roleQueries = {
    getAllRoles: getAllRoles,
}
