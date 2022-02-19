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
                status: data.status,
                title: data.title,
                description: data?.description,
                expireAt: data?.expireAt,
                userId: user,
                slug,
            }
        })

        if(data.questions.length) {
            for(let i =0; i < data.questions.length; i++) {
                 await prisma.surveyQuestion.create({
                    data: {
                        ...data.questions[i],
                        data: JSON.stringify(data.questions[i].data),
                        surveyId: survey.id
                    }
                })
            }
        }

        return res.status(200).json({survey})
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            status: 500,
            message: "Soemthing went wrong"
        })
    }
}