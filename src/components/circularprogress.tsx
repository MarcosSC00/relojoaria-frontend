import { useEffect, useState } from "react";

interface CircularProgressProps{
    value: number;
    size?: number;
    strokeWidth?: number;
    textSize?: string;
}

export function CircularProgress({value, size=165, strokeWidth=10, textSize}: CircularProgressProps){
    const [percent, setPercent] = useState(0);
    const radius = (size - strokeWidth) / 2;
    const circumference = 2*Math.PI*radius;
    const progressOffset = circumference - (value / 100) * circumference;

    useEffect(() => {
        const duration = 1000;
        const startTime = performance.now();

        const animate = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);

        setPercent(Math.round(progress * value));

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
        };

        requestAnimationFrame(animate);
    }, [value]);
    return(
        <div className="flex flex-col items-center gap-3">
            <div className="relative">
                <svg width={size} height={size} className="-rotate-90">
                    <circle 
                        cy={size / 2}
                        cx={size / 2}
                        r={radius}
                        strokeWidth={strokeWidth}
                        stroke="#E5E7EB"
                        fill="transparent"
                    />
                    <circle
                       cy={size / 2}
                       cx={size / 2}
                       r={radius}
                       strokeWidth={strokeWidth} 
                       stroke="#2563EB"
                       fill="transparent"
                       strokeDasharray={circumference}
                       strokeLinecap="round"
                       strokeDashoffset={progressOffset}
                       style={{
                        "--circle-length": circumference,
                        "--progress-offset": progressOffset
                       } as React.CSSProperties}
                       className="transition-all animate-[loader-progress_1s_ease-in-out]"
                    />
                </svg>

                <span className={`flex absolute inset-0 items-center justify-center
                ${textSize && textSize} font-semibold text-slate-400`}>
                    {percent}%
                </span>
            </div>
        </div>
    )
}