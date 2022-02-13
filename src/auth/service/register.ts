import {NextApiRequest, NextApiResponse} from "next";
import prisma from "../../../lib/prisma";
import registerSchema from "../schema/register";
import {Prisma} from "@prisma/client";
// @ts-ignore
import bcrypt from "bcrypt"

export const register = async (res: NextApiResponse, req: NextApiRequest) => {
    const data = req.body

    try {
        await registerSchema.validate(data)
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: "Bad Request"
        })
    }

    try {
        const hashPassword = await bcrypt.hash(data.password, 12)
        const user = await prisma.user.create({
            data: {...data, password: hashPassword}
        })
        return res.status(201).json(user)
    } catch (e) {
        let errorRes = {status: 500, message: "something went wrong"}

        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            switch (e.code) {
                case 'P2002' :
                    errorRes = {
                        status: 403,
                        message: 'There is a unique constraint violation, a new user cannot be created with this email'
                    }
                    break;
                default :
                    break;
            }
        }

        return res.status(errorRes.status).json(errorRes)
    }
}