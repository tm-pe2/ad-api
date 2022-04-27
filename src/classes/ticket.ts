import * as Joi from 'joi';

export interface Ticket {
    TicketID: number,
    IssueID: number,
    AssignedTech: number,
    Title: string,
    Description: string,
    Date: Date,
    Status: number,
    Employee: number
}

export const ticketSchema = Joi.object({
    TicketID: Joi.number().integer().min(0).required(),
    IssueID: Joi.number().integer().min(0).required(),
    AssignedTech: Joi.number().required(),
    Title: Joi.string().required(),
    Description: Joi.string().required(),
    Date: Joi.date().min('1-1-1900').required(),
    Status: Joi.number().required(),
    Employee: Joi.number().required()
})
