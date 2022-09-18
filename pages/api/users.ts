import type { NextApiRequest, NextApiResponse } from 'next'
import Data from "../../db/users.json";

export type UserType = {
  name: string,
  avatar: string,
  id: string,
  schedules?: any[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserType[]>
) {
  res.status(200).json(Data)
}
