import {useFieldArray, useFormContext} from "react-hook-form";
import React from "react";

function QuestionEditor() {

    const { control, watch } = useFormContext();

    const {fields, append, remove} = useFieldArray({name: 'questions', control});

    const questionLength = watch("questions")?.length || 0

    const addQuestion = () => {
        append({question: '', type: '', description: ''});
    }

    return <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
        <h3 className="text-2xl font-semibold flex items-center justify-between">
            Questions


            <button
                onClick={addQuestion}
                type="button"
                className="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                    />
                </svg>
                Add Question
            </button>

        </h3>
        {questionLength === 0 && <div className="text-center text-gray-600">
            You don't have any questions created
        </div>}

        {fields.map((item, i) => (
            <div key={i} className="list-group list-group-flush">
                <div className="list-group-item">
                    <h5 className="card-title">Ticket {i + 1}</h5>
                    <div className="form-row">

                    </div>
                </div>
            </div>
        ))}
    </div>
}

export default QuestionEditor