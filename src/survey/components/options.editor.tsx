import {useFieldArray, useFormContext} from "react-hook-form";
import {PlusSmIcon as PlusSmIconSolid} from "@heroicons/react/solid";
import React from "react";
import Input from "../../app/component/input";

interface OptionsEditorProps {
    index: number
}

function OptionsEditor({index}: OptionsEditorProps) {
    const {control, watch, register, formState: {errors}} = useFormContext();

    const {fields, append, remove} = useFieldArray({name: `questions[${index}].data`, control});

    const optionsLength = watch(`questions[${index}].data`)?.length || 0


    const handleAdd = () => {
        append({text: ""})
    }

    const handleDelete = (idx: number) => {
        remove(idx)
    }

    return <div className="mt-3 col-span-12">
        <div className="mt-2 ">
            <div className="flex mb-2 justify-between items-center">
                <h4 className="text-sm font-semibold flex justify-between items-center">
                    Options
                </h4>
                <button
                    onClick={handleAdd}
                    type="button"
                    className="inline-flex ml-3 items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <PlusSmIconSolid className="h-5 w-5" aria-hidden="true"/>
                </button>
            </div>
            {optionsLength ?
                fields.map((item, k) => {
                    return (
                        <div key={k} className="flex items-center text-gray-600 text-center py-3">
                            <span className="w-6 text-md"> {k + 1}. </span>
                            <div className="w-full px-12">
                                <Input
                                    ref={{...register(`questions[${index}].data[${k}].text`)}}
                                    error={!!errors?.questions?.[index].data[k].text}
                                    errorMessage={errors?.questions?.[index].data[k].text.message}
                                    type={"text"}
                                    name={`questions[${index}].data[${k}].text`} />
                            </div>
                            <button
                                onClick={() => handleDelete(k)}
                                type="button"
                                className="h-6 w-6 rounded-full flex items-center justify-center border border-transparent transition-colors hover:border-red-100 "
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className=" text-red-500"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                    )
                }) : <div
                    className="text-xs text-gray-600 text-center py-3"
                >
                    You don't have any options defined
                </div>}
        </div>
    </div>
}

export default OptionsEditor