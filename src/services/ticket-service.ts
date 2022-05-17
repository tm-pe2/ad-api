import {execute} from "../utils/mysql.connector";
import {Ticket} from "../classes/ticket";
import {ticketQueries} from "../queries/ticket-queries";

export function getAllTickets(): Promise<Ticket[]> {
    const promise = new Promise<Ticket[]>((resolve,reject) => {
        execute<Ticket[]>(ticketQueries.getAllTickets, []).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No tickets!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function getTicketById(id: Ticket['ticket_id']): Promise<Ticket> {
    const promise = new Promise<Ticket>((resolve,reject) => {
        execute<Ticket>(ticketQueries.getTicketById, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No tickets!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function insertTicket(ticket: Ticket): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(ticketQueries.addTicket, [
            ticket.issue_id,
            ticket.assigned_tech,
            ticket.title,
            ticket.description,
            ticket.date,
            ticket.status_id,
            ticket.is_employee]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Ticket could not be added!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function updateTicket(ticket: Ticket): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(ticketQueries.updateTicket, [
            ticket.issue_id,
            ticket.assigned_tech,
            ticket.title,
            ticket.description,
            ticket.date,
            ticket.status_id,
            ticket.is_employee,
            ticket.ticket_id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Ticket could not be updated!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function deleteTicketById(id: Ticket['ticket_id']): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(ticketQueries.deleteTicketById, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Ticket could not be deleted!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};
