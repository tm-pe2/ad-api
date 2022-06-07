# Routes

Here we will be defining the new routes we'll work towards.
This document will serve for feedback, documentation and a TODO list.

We will only create what is necessary and try to follow REST conventions as closely as possible.  
We want to minimize the calls frontend needs to make

For example in the previous design `addresses` was a seperate route. It would be preferable to have this included in other routes.
This way the end-user doesn't need to call addresses seperately. This also simplifies protecting routes.

## [Auth](auth.md)

Easy peasy:
- [X] POST `/login`
  - Seperate query for login information
- [X] POST `/logout`
- [X] POST `/token`
  - Refactor for multiple roles

## [Users](users.md)

- [X] GET `/users/self`

Contains everything of a user except the password.  
For example addresses is also inside the user, no extra request.

> DELETE will never be a method. Deactivating the user might be prefered.

## Employees

GET/POST/PUT:  
- `/employees`
- `/employees/:user_id`

Contains base of user information + employee specific information.

## [Customers](customers.md)

- [X] GET `/customers`
- [X] GET `/customers/:user_id`
- [X] POST `/customers`

Contains base of user information + customer specific information.

## Supplier

- [ ] GET `/suppliers`
- [ ] GET `/suppliers/:user_id`
- [ ] POST `/suppliers`
- [ ] PUT `/suppliers/:user_id`

*No delete! -> front-end disable user instead*

## [Contracts](customers.md)

- [X] GET `/contracts`
- [X] GET `/contracts/:user_id`
- [ ] POST `/contracts/:user_id`
- [ ] GET `/contracts/self`

Will contain user_id and address_id as well.

**Gets activated when the first meter value submission gets made by an employee.**  
-> No PUT or PATCH needed, will be done in function
- [ ] Adjust status with function

## Consumptions

**In need of clarification:**

GET/POST:
- [ ] GET `/consumptions/:user_id`
  - Get all consumptions and meters of a user
- [ ] POST `/consumptions/:meter_id`
  - Used to manual meter readings
- [ ] GET `/consumptions/self`
  - Used to generate personal usage graphs

Consumptions don't need to be updated, maybe no PUT?
Or just delete and new post?

## Estimations

- [ ] POST `/estimations/self`

## Invoices

Should be easy
- [ ] GET `/invoices`
- [ ] GET `/invoices/self`

- ~~`invoices/:invoice_id`~~
  - **Unnecessary GET** -> already inside /invoices
  - We are only allowed to update the invoice if it has not yet been sent yet from a legal perspective.
    - For sake of simplicity we will not allow this at all.
  - **No POST** -> gets created inside API every month and year
- ~~`invoices/:invoice_id/download`~~ -> Move to front-end
- ~~`/overdue`~~ -> Move filter to front-end (or query filter)

## Planning

*Unsure of how the front-end works for this.*
- `/planning`
- `/planning/:id`

## [Cities](city.md)

- [X] GET `/cities`

## ~~Tickets~~

*Not in the current database design nor requirements*
