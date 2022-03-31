import { Request, Response, NextFunction } from 'express';

interface TechTasks{
    Name: String;
    Location: String;
    WhenDate: String;
    Completed: boolean;
}

const Tasks: Array<TechTasks> =
[
    {Name: "Stefaan", Location:"Thuis",WhenDate:"2022/01/02", Completed:false},
    {Name: "Mario", Location:"NieuwStraat 98",WhenDate:"2022/01/02", Completed:true},
    {Name: "Luigi", Location:"OverBuurman",WhenDate:"2022/08/08", Completed:false},
    {Name: "Patrick", Location:"NaasteBuurman",WhenDate:"2022/08/08", Completed:false},
    {Name: "Michael", Location:"Achterbuurman",WhenDate:"2022/08/08", Completed:false}
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