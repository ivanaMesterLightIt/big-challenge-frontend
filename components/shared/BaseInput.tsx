import { FC, InputHTMLAttributes } from "react";

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
label: string;
name: string;
placeholder: string;
}

export const BaseInput: FC<BaseInputProps> = ({ label, type, name, placeholder }) => {
    return (
    <div>
        <label htmlFor={ name } className="block text-sm font-medium text-gray-700">
            { label }
        </label>
        <div className="mt-1">
            <input type={ type } name={ name } id={ name }
                className="block w-full rounded-md py-2 px-1 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder={ placeholder } />
        </div>
    </div>
    );
    }
