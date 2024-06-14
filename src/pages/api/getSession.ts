import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.cookies && req.cookies.token) {
    res.status(200).json({ token: req.cookies.token });
  } else {
    res.status(401).json({ message: 'No active session' });
  }
}