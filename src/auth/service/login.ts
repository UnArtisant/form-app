import loginSchema from "../schema/login";
import prisma from "../../../lib/prisma";
import {NextApiRequest, NextApiResponse} from "next";
// @ts-ignore
import bcrypt from "bcrypt"

export const login = async (res: NextApiResponse, req: NextApiRequest) => {
    const data = req.body
    try {
        await loginSchema.validate(data)
    } catch (e) {
        res.status(400).json({
            status: 400,
            message: "Bad Request"
        })
    }
    const user = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })

    if(user !== null) {
        const isValidPassword = await bcrypt.compare(data.password,user.password)
        if(isValidPassword) {
            return res.status(200).json(user)
        }
    }

    return res.status(403).json({
        status: 403,
        message: "Wrong credentials"
    })
}