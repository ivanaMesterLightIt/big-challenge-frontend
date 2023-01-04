import { useRouter } from "next/router";
import { FC } from "react";

interface Props {
    returnTo: string;
}

export const BackButton: FC<Props> = ({ returnTo }) => {

    const router = useRouter();

    const navigateBack = () => {
        router.push(returnTo);
    }

    return (
        <button
            type="button"
            className="inline-flex items-center rounded-full border border-transparent p-2 hover:bg-gray-100 focus:outline-none focus:ring-offset-2"
            onClick={ navigateBack }
        >
            {
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                </svg>
            }
        </button>
    );
}