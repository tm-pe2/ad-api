export interface Invoice {
    InvoiceID: number,
    CustomerID: number,
    SupplierID: number,
    Date: Date,
    DueDate: Date,
    Status: number,
    GasAmount: number,
    ElectricityType: number,
    Price: number,
    Tax: number,
    StartDate: Date,
    EndDate: Date
}
