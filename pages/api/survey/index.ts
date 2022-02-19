import {NextApiRequest, NextApiResponse} from "next";
import {newSurvey} from "../../../src/survey/service/new.survey";
import {updateSurvey} from "../../../src/survey/service/update.survey";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

   switch (req.method) {
       case 'POST' :
           return newSurvey(req, res)
       case 'PUT' :
           return updateSurvey(req, res)
       default :
           return res.status(400).json({
               status: 400,
               message: "Bad Request"
           })
   }

}