const getAllRoles = `
    SELECT id,name,description FROM roles
`

export const roleQueries = {
    getAllRoles: getAllRoles,
}