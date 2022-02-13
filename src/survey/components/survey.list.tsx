import {Prisma} from "@prisma/client";
import {SurveyCard} from "./survey.card";

interface SurveyListProps {
    surveys: Prisma.SurveySelect[] | []
}

function SurveyList ({surveys}: SurveyListProps) {
    return (
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {surveys.map((survey, k) => (
                <SurveyCard key={k} survey={survey} />
            ))}
        </ul>
    )
}

export default SurveyList