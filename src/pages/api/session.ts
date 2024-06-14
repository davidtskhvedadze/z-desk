import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.cookies && req.cookies.token) {
    res.status(200).json({ message: "Token exists"});
} else {
    res.json({ message: "Does not exist"});
}
}