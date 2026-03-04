export function Loading() {
    return (
        <svg 
            viewBox="25 25 50 50"
            className="w-[2em] origin-center transition-all
            animate-[rotate4_2s_linear_infinite]"
        >
            <circle 
                r="20" 
                cy="50" 
                cx="50"
                strokeDasharray={"1,200"}
                strokeLinecap="round"
                strokeDashoffset={0}
                stroke="#2563EB"
                strokeWidth={2}
                fill="transparent"
                className="transition-all animate-[dash4_1.5s_ease-in-out_infinite]"
            />
        </svg>
    )
}