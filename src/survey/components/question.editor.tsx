import {useFieldArray, useFormContext} from "react-hook-form";
import React from "react";
import Input from "../../app/component/input";
import TextArea from "../../app/component/textarea";

const types = [
    "text",
    "select",
    "radio",
    "checkbox",
    "textarea"
]

function QuestionEditor() {

    const {control, watch, register, formState: {errors}} = useFormContext();

    const {fields, append, remove} = useFieldArray({name: 'questions', control});

    const questionLength = watch("questions")?.length || 0

    const addQuestion = () => {
        append({question: '', type: 'text', description: ''});
    }

    const handleDelete = (index: number) => {
        remove(index)
    }

    const shouldHaveOptions = (type: string) => {
        return ["select", "radio", "checkbox"].includes(type);
    }

    return <div className="px-4 py-5 bg-white space-y-6 ">
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
            <div key={i}>
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">{i + 1}. {watch(`questions[${i}]question`)}</h3>
                    <div className="flex items-center">
                        <button
                            onClick={() => handleDelete(i)}
                            type="button"
                            className="
                    flex
                    items-center
                    text-xs
                    py-1
                    px-3
                    rounded-sm
                    border border-transparent
                    text-red-500
                    hover:border-red-600
                    hover:rounded-full
                    "
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Delete
                        </button>
                    </div>
                </div>
                <div className="my-2 grid gap-3 grid-cols-12">
                    <div className="mt-3 col-span-9">
                        <Input
                            ref={{...register(`questions.${i}.question`)}}
                            error={!!errors?.questions?.[i].question}
                            errorMessage={errors?.questions?.[i].question.message}
                            type={"text"}
                            name={`questions.${i}.question`}
                            label={"Title"}/>
                    </div>

                    <div className="mt-3 col-span-3">
                        <label className="block text-md mb-2 font-medium text-gray-700">
                            Select Question Type
                        </label>
                        <select
                            {...register(`questions.${i}.type`)}
                            id={`questions.${i}.type`}
                            name={`questions.${i}.type`}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            {types.map((item, k) => (
                                <option key={k} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-3 col-span-12">
                        <TextArea
                            ref={{...register(`questions.${i}.description`)}}
                            error={!!errors?.questions?.[i].description}
                            errorMessage={errors?.questions?.[i].question.description}
                            placeholder={"describe your question"}
                            name={`questions.${i}.description`}
                            label={"Description"}/>
                    </div>

                    <div className="">
                        {shouldHaveOptions(watch(`questions.${i}.type`)) &&
                            <div className="mt-2">
                            <div className="flex items-center">
                                <h4 className="text-sm font-semibold mb-1 flex justify-between items-center">
                                    Options
                                </h4>
                                <button
                                    type="button"
                                    className="
                                flex
                                items-center
                                text-xs
                                py-1
                                px-3

                                rounded-full
                                ml-3
                                text-white
                                bg-gray-600
                                hover:bg-gray-700
                                "
                                >
                                    Add Option
                                </button>
                            </div>
                        </div>}
                    </div>

                </div>
            </div>
        ))}
    </div>
}

export default QuestionEditor