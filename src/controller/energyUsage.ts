import { Request, Response, NextFunction } from 'express';

interface Usage {
    id: Number,
    client: String,
    usage: Number,
}

const Usages: Usage[] = [
    {
      id: 0,
      client: "AB1234",
      usage: 543,
    },
    
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