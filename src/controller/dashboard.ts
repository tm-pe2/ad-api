import { Request, Response, NextFunction } from 'express';

// Dummy interface
interface User {
    id: Number,
    name: String,
    email: String,
    phone: String,
    address: String,
    birthday: String,
    pfpsrc: String,
    type: String
}

const dummyUsers: User[] = [
    {
      id: 0,
      name: "Bob Johnson",
      email: "example@example.com",
      phone: "+01 23/45/67/89",
      address: "59 Golden Leaf Road",
      birthday: "19/05/1965",
      pfpsrc: "../../assets/img/dashboard/human.webp",
      type: "Employee"
    },
    {
      id: 1,
      name: "Jeff Berry",
      email: "example@example.com",
      phone: "+01 23/45/67/89",
      address: "3155 Carioca Hill",
      birthday: "23/06/1980",
      pfpsrc: "../../assets/img/dashboard/tech.webp",
      type: "Technician"
    },
    {
      id: 2,
      name: "Abigail Janssens",
      email: "example@example.com",
      phone: "+01 23/45/67/89",
      address: "0287 Mayer Hill",
      birthday: "23/03/1995",
      pfpsrc: "../../assets/img/dashboard/woman.jpg",
      type: "User"
    },
  ]

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(200).json(dummyUsers[Number(req.params.id)]);
    }
    catch {
        return res.status(400);
    }
};

export default {getUser}
