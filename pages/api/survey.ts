import {NextApiRequest, NextApiResponse} from "next";
import {newSurvey} from "../../src/survey/service/new.survey";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {
        return newSurvey(req, res)
    }


}