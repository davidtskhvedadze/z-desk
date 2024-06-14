

export default function Loading() {
    return (
        <div className="flex justify-center items-center h-96">
            <svg
                className="animate-spin -ml-1 mr-3 h-12 w-12 text-indigo-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8 8 0 0012 20v-4a4 4 0 00-4-4V7.708L6.707 9.99z"
                ></path>
            </svg>
            <span className="text-2xl text-gray-700">Loading...</span>
        </div>
    );
}