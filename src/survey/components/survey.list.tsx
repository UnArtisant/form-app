import {Prisma} from "@prisma/client";
import {SurveyCard} from "./survey.card";
import {useState} from "react";

interface SurveyListProps {
    surveys: Prisma.SurveySelect[] | []
}

function SurveyList ({surveys}: SurveyListProps) {
    const [surveyData, setSurveyData] = useState(surveys)

    const handleRemove = (index: number) => {
        const s: any = []
        surveyData.forEach((item, k) => {
            if(k !== index) {
                s.push(item)
            }
        })
        setSurveyData(s)
    }

    return (
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {surveyData.map((survey, k) => (
                <SurveyCard key={k} handleRemove={() => handleRemove(k)} survey={survey} />
            ))}
        </ul>
    )
}

export default SurveyList