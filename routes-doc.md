# Routes

Here we will be defining the new routes we'll work towards.
We will only create what is necessary and try to follow REST conventions as closely as possible.  
We want to minimize the calls frontend needs to make

For example in the previous design `addresses` was a seperate route. It would be preferable to have this included in other routes.
This way the end-user doesn't need to call addresses seperately. This also simplifies protecting routes.

## Auth

Remains as is

## Users

GET:  
- `users/self`

Instead of DELETE a enable/disable method

Contains everything of a user except the password.  
For example addresses is also inside the user, no extra request.

> DELETE will never be a method. Deactivating the user might be prefered.
> 
## Employees

GET/POST/PUT:  
- `employees`
- `employees/:user_id`

Contains base of user information.

## Customers

GET/POST/PUT:  
- `customers`
- `customers/:user_id`

Contains base of user information.

## Contracts

GET/POST/PUT:
- `contracts`
- `contract/:id`

Will contain user_id and address_id.

## Consumptions

GET/POST/PUT:
- `consumptions`
- `consumptions/:meter_id`

Consumptions don't need to be updated, maybe no PUT?
Or just delete and new post?

## Invoices

GET/POST/PUT:
- `invoices`
- `invoices/:invoice_id`
  - Unnecessary GET -> already inside /invoices
  - PUT only updates the invoice if not yet sent
  - No POST -> gets created inside API every month and year
- `invoices/self`
- ~~`invoices/:invoice_id/download`~~ -> Move to front-end
- ~~`/overdue`~~ -> Move filter to front-end

## Tickets

*Missing but will be similar*

## Planning

GET/POST/PUT:
- `planning`
- `planning/:id`

## Cities

GET:
- `cities`
