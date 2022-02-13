import {ExclamationCircleIcon} from "@heroicons/react/solid";
import React from "react";

interface TextAreaProps {
    name: string,
    placeholder?: string,
    label?: string,
    error?: boolean,
    errorMessage?: string,
    id?: string,
    ref?: any,
}

// eslint-disable-next-line react/display-name
const TextArea : React.FC<TextAreaProps> = React.forwardRef(({label,error = false, errorMessage = "",...props}, ref) => {
    return (
        <div>
            {label && <label htmlFor={props.name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>}
            <div className="mt-1 relative rounded-md shadow-sm">
                <textarea
                    {...ref}
                    {...props}
                    className={`block border w-full px-3 py-2 w-full pr-10 ${error ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500 placeholder-red-300" : "border-gray-300 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"} focus:outline-none sm:text-sm rounded-md`}
                    aria-invalid={error}
                />
                {error &&
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true"/>
                    </div>
                }
            </div>
            {error && <p className="mt-2 text-sm text-red-600" id="email-error">
                {errorMessage}
            </p>}
        </div>
    )
})

export default TextArea