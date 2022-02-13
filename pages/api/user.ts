import prisma from "../../lib/prisma";
import {NextApiRequest, NextApiResponse} from "next";
import {USER_COOKIES} from "../../src/auth/constant/cookie";
import {me} from "../../src/auth/service/me";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        return await me(res, req)
    }

}