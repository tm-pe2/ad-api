const insertEmployee = `
    INSERT INTO employees (user_id, hire_date, salary) VALUES ($1, $2, $3)
`

export const employeeQueries = {
    insertEmployee: insertEmployee
}