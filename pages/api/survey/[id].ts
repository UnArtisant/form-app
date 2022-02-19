import {NextApiRequest, NextApiResponse} from "next";
import {deleteSurvey} from "../../../src/survey/service/delete.survey";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
        case "DELETE" :
            return deleteSurvey(req, res)
        default :
            return res.status(400).json({
                status: 400,
                message: "Bad Request"
            })
    }
}