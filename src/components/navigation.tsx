import { useState } from "react";
import { Link } from "react-router";

export function Navigation() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  return (
    <div className="px-6 py-4 w-full bg-white border-b border-gray-200">
      <nav>
        <ul className="flex w-full text-right gap-8 text-sm font-semibold text-gray-400">
          {Array.from({ length: 5 }).map((item, index) => (
            <li
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`cursor-pointer transition-colors hover:text-gray-600
                ${
                  activeIndex === index
                    ? "border-b-2 border-gray-600 text-gray-600"
                    : ""
                }`}
            >
              <Link to={""}>OPTION</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
