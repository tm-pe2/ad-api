import { Request, Response, NextFunction } from 'express';

interface Usage {
    id: Number,
    usage: Number[],
}

// the query that has Usages as result:
// Get usage where client is the right clien
// Order by date
// Get the last 12 usages
// -> this is for the monthly graph

const Usages: Usage[] = [
    {
      id: 0,
      usage: [543.9, 423.6, 678.9, 203.8, 345, 123, 567.8, 890.2, 756.7, 456.7, 789.8, 987.6],
    },
    {
        id: 1,
        usage: [643.9, 623.6, 578.9, 303.8, 445, 223, 467.8, 990.2, 856.7, 356.7, 689.8, 987.6],
    }
  ]

const getUsage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(200).json(Usages[Number(req.params.id)]);
    }
    catch {
        return res.status(400);
    }
};

export default {getUsage}