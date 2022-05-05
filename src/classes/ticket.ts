import * as Joi from 'joi';

export interface Ticket {
    ticket_id: number,
    issue_id: number,
    assigned_tech: number,
    title: string,
    description: string,
    date: Date,
    status_id: number,
    is_employee: boolean
}

export const ticketSchema = Joi.object({
    ticket_id: Joi.number().integer().min(0).required(),
    issue_id: Joi.number().integer().min(0).required(),
    assigned_tech: Joi.number().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    Date: Joi.date().min('1-1-1900').required(),
    status_id: Joi.number().required(),
    is_employee: Joi.bool().required()
})
