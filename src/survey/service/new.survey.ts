import {USER_COOKIES} from "../../auth/constant/cookie";
import slugify from "slugify";
import prisma from "../../../lib/prisma";
import {NextApiRequest, NextApiResponse} from "next";

export const newSurvey = async (req: NextApiRequest, res: NextApiResponse) => {
    const user = req.cookies[USER_COOKIES]


    if(!user) {
        return res.status(404).json({
            status: 404,
            message: "User not found"
        })
    }

    try {
        const data = req.body
        const slug = slugify(data.title)
        const survey = await prisma.survey.create({
            data: {
                ...data,
                userId: user,
                slug,
            }
        })

        return res.status(200).json({survey})
    } catch (e) {
        return res.status(500).json({
            status: 500,
            message: "Soemthing went wrong"
        })
    }
}