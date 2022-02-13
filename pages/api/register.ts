import {NextApiRequest, NextApiResponse} from "next";
import {register} from "../../src/auth/service/register";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        return await register(res,req)
    } else {
        return res.status(400).json({
            status: 400,
            message: "Bad Request"
        })
    }
}