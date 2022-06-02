# Routes

Here we will be defining the new routes we'll work towards.
This document will serve for feedback, documentation and a TODO list.

We will only create what is necessary and try to follow REST conventions as closely as possible.  
We want to minimize the calls frontend needs to make

For example in the previous design `addresses` was a seperate route. It would be preferable to have this included in other routes.
This way the end-user doesn't need to call addresses seperately. This also simplifies protecting routes.

## Auth

Easy peasy:
- [ ] POST `/login`
  - Seperate query for login information
- [X] POST `/logout`
- [ ] POST `/token`
  - Refactor for multiple roles

**Unsure how we will handle the registration**
- [ ] POST `/register`

## Users

- [ ] GET `/users/self`

(Instead of DELETE a enable/disable method?)

Contains everything of a user except the password.  
For example addresses is also inside the user, no extra request.

> DELETE will never be a method. Deactivating the user might be prefered.

## Employees

**In need of clarification in terms of registration**

GET/POST/PUT:  
- `/employees`
- `/employees/:user_id`

Contains base of user information + employee specific information.

## Customers

**In need of clarification in terms of registration**

- [X] GET `/customers`
- [X] GET `/customers/:user_id`

Contains base of user information + customer specific information.

## Contracts

- [ ] GET `/contracts`
- [ ] GET `/contracts/:user_id`
- [ ] POST `/contracts/:user_id` // ?
- [ ] PUT `/contracts/:user_id` // ?

Will contain user_id and address_id as well.

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

## Cities

Easy peasy:
- [ ] GET `/cities`
  - Simply receive all postalcodes for selection in front-end

## ~~Tickets~~

*Not in the current database design nor requirements*
