import {NextApiRequest, NextApiResponse} from "next";
import {USER_COOKIES} from "../../auth/constant/cookie";
import prisma from "../../../lib/prisma";

export const deleteSurvey = async (req: NextApiRequest, res: NextApiResponse) => {
    const user = req.cookies[USER_COOKIES]

    if (!user) {
        return res.status(404).json({
            status: 404,
            message: "User not found"
        })
    }

    try {
        // could add transaction in case it fail


        const params = req.query


        const survey = await prisma.survey.findUnique({
            where: {
                id: params.id
            },
            select: {
                id: true,
                user: {
                    select: {
                        id : true
                    }
                },
                surveyQuestions: {
                    select: {
                        id: true
                    }
                }
            }
        })

        if(!survey) {
            return res.status(404).json({
                status: 404,
                message: "Survey not found"
            })
        }

        if(survey.user.id !== user) {
            return res.status(403).json({
                status: 403,
                message: "Access denied"
            })
        }


        for(let i =0; i < survey.surveyQuestions.length; i++) {
            await prisma.surveyQuestion.delete({
                where: {id: survey.surveyQuestions[i].id}
            })
        }

        await prisma.survey.delete({
            where: {
                id: survey.id
            }
        })

        return res.status(200).json({message: "ok"})
    } catch (e) {
        return res.status(500).json({
            status: 500,
            message: "Soemthing went wrong"
        })
    }
}