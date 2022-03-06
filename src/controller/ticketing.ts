import { Request, Response, NextFunction } from 'express';

interface Ticket{
    name: String;
    issue: String;
    description: String;
    id?: number;
    status?: String;
}
const tickets: Array<Ticket> = [
    { name: 'Dries', issue: 'This is a test issue', description: 'Test issue',  id: 0 , status: "open"},
    { name: "Peter", issue: "Laptop start met een groen scherm", description: "Mijn laptop heeft bij het opstarten een groen scherm, en soms start hij helemaal niet op!", id: 1 , status: "In progress"},
    { name: "Dries", issue: "Windows XP is gehacked en FB is geblokkeerd!", description: "Bij het inloggen op windows XP wordt mijn scherm rood en verschijnt een melding dat ik Bitcoin moet storten op hun adres om toegang te krijgen tot mijn bestanden, hierdoor kan ik niet op Facebook!", id: 2 , status:"Closed"},
  ]


const getTickets = async (req: Request, res: Response, next: NextFunction) => {
    try{
        return res.status(200).json({tickets});
    }
    catch {
        return res.status(500).json({message: "Something went wrong"});
    }
}


export default {getTickets}