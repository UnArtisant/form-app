import {NextApiRequest, NextApiResponse} from "next";
import {login} from "../../src/auth/service/login";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    return await login(res, req)
}