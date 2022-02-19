import {NextApiRequest, NextApiResponse} from "next";
import {USER_COOKIES} from "../../auth/constant/cookie";
import slugify from "slugify";
import prisma from "../../../lib/prisma";

export const updateSurvey = async (req: NextApiRequest, res: NextApiResponse) => {
    const user = req.cookies[USER_COOKIES]

    if (!user) {
        return res.status(404).json({
            status: 404,
            message: "User not found"
        })
    }

    try {
        const data = req.body

        const s = await prisma.survey.findUnique({
            where: {
                id: data.id
            },
            select: {
                id: true,
                user: {
                    select: {
                        id : true
                    }
                }
            }
        })

        if(!s) {
            return res.status(404).json({
                status: 404,
                message: "Survey not found"
            })
        }

        if(s.user.id !== user) {
            return res.status(403).json({
                status: 403,
                message: "Access denied"
            })
        }

        const slug = slugify(data.title)

        const survey = await prisma.survey.update({
            where: {
                id: data.id
            },
            data: {
                status: data.status,
                title: data.title,
                description: data?.description,
                expireAt: data?.expireAt,
                updatedAt: new Date(),
                slug
            },
            include: {
                surveyQuestions: {
                    select: {
                        id: true,
                    }
                }
            }
        })


        if (data.questions.length) {

            let remove: any = []
            survey.surveyQuestions.forEach(item => {
                 let isDefined = data.questions.findIndex((i: any) => {
                     return item.id === i?.id
                 })
                 if(isDefined === -1) {
                      remove.push(item)
                 }
            })

            for (let i = 0; i < remove.length; i++) {
                await prisma.surveyQuestion.delete({
                    where : {
                        id: remove[i].id
                    }
                })
            }

            for (let i = 0; i < data.questions.length; i++) {
                if (data.questions[i]?.id) {
                    await prisma.surveyQuestion.update({
                        where: {
                            id: data.questions[i].id
                        },
                        data: {
                            ...data.questions[i],
                            updatedAt: new Date(),
                            data: JSON.stringify(data.questions[i].data),
                            surveyId: survey.id
                        }
                    })
                } else {
                    await prisma.surveyQuestion.create({
                        data: {
                            ...data.questions[i],
                            data: JSON.stringify(data.questions[i].data),
                            surveyId: survey.id
                        }
                    })
                }
            }
        }

        return res.status(200).json({survey})
    } catch (e) {
        return res.status(500).json({
            status: 500,
            message: "Soemthing went wrong"
        })
    }
}