/* eslint-disable react/no-unescaped-entities */

import { BaseButton } from "../components/shared/BaseButton";
import { BaseInput } from "../components/shared/BaseInput";

export interface IFormInput {
    name: string,
    email: string,
    password: string,
    repeatPassword: string,
    userType: 'Patient' | 'Doctor'
}

export default function SignUpPage() {

    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="w-[664px]">
            <div className="w-full py-3 mb-10 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-semibold">Welcome to the doctor's app</h1>
                <span className="mt-3 text-sm">Sign up to access unique features</span>
            </div>
            <form>
                <div className="w-full flex flex-row items-center justify-between">
                    <BaseInput label="Name" name='name' />
                    <BaseInput label="Email" name='email' type='email' />
                </div>
                <div className="w-full my-4 flex flex-row items-center justify-between">
                    <BaseInput label="Password" name='password' type='password' />
                    <BaseInput label="Repeat Password" name='repeatPassword' type='password' />
                </div>
                <label className="px-3 pb-1 block text-sm font-medium text-gray-700">User type</label>
                <div className="flex flex-row items-center justify-between px-3">
                    <div className="flex items-center w-full border border-gray-300 rounded-l p-3">
                        <input
                            id='doctor'
                            name="userType"
                            type="radio"
                            defaultChecked={true}
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label className="ml-3 block text-sm font-medium text-gray-700">
                            Doctor
                        </label>
                    </div>
                    <div className="flex items-center w-full border border-gray-300 rounded-r p-3">
                        <input
                            id='patient'
                            name="userType"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label className="ml-3 block text-sm font-medium text-gray-700">
                            Patient
                        </label>
                    </div>
                </div>
                <div className="mt-10 w-full px-3">
                    <BaseButton buttonClass="primary" text='Sign up' type="submit" />
                </div>
            </form>
            <div className="mt-10 flex flex-row items-center justify-center text-sm">
                <span className="text-gray-500 mr-1">Already have an account?</span>
                <span className="text-blue-600 hover:underline cursor-pointer">Log in</span>
            </div>
        </div>
      </div>
    )
  }