import { Request, Response, NextFunction } from 'express';

interface TechTasks{
    Name: String;
    Location: String;
    WhenDate: Date;
    Completed: boolean;
}

const Tasks: Array<TechTasks> =
[
    {Name: "Stefaan", Location:"Thuis",WhenDate:new Date(), Completed:false},
    {Name: "Mario", Location:"NieuwStraat 98",WhenDate:new Date(), Completed:true},
    {Name: "Luigi", Location:"OverBuurman",WhenDate:new Date(), Completed:false}
]

const GetTasks =async (req:Request, res: Response, next: NextFunction) => {
    try
    {
        return res.status(200).json({Tasks});
    }
    catch
    {
        return res.status(500).json({message: "Something went wrong"});
    }
}

export default {GetTasks}