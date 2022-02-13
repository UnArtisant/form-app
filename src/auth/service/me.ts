import {NextApiRequest, NextApiResponse} from "next";
import {USER_COOKIES} from "../constant/cookie";
import prisma from "../../../lib/prisma";

export const me = async (res: NextApiResponse, req: NextApiRequest) => {
    const cookies = req.cookies
    const id = cookies?.[USER_COOKIES]

    if (id) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        if(user) {
            return res.status(200).json(user)
        }
    }
    return res.status(404).json({
        status: 404,
        message: "user not found"
    })
}