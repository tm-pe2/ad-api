/** Role defining permission level of a user
 * These need to match up with the names in the database.
*/
export enum UserRole {
    ADMIN = 'admin',
    ACCOUNTANT = 'accountant',
    CUSTOMER = 'customer',
    HR_MANAGER = 'hr_manager',
    MANAGER = 'manager',
    SUPPLIER = 'supplier',
    TECHNICIAN = 'technician',
    SUPPORT = 'support',
}