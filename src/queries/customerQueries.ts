export const CustomerQueries = {
    getAllCustomers: `
    Select * FROM clients
    `,
  
    getCustomerById: `
    Select * FROM clients Where ClientID = ?
    `,
  
    AddCustomer: `
    INSERT INTO clients SET ?
    `,
  
    UpdateCustomer: `
    UPDATE clients SET 
        FirstName = ?,
        LastName = ?,
        BirthDate = ?,
        AdressID = ?,
        Email = ?,
        PhoneNumber = ?,
        Password = ? 
    WHERE ClientID = ?
    `,
  
    DeleteCustomerById: `
    DELETE FROM clients Where ClientID = ?
    `
  };