import { Search } from "lucide-react";
import type { ReactNode } from "react";

interface HeaderSectionProps {
  title: string;
  children: ReactNode;
  handleFilter?: (name: string) => void;
}

export function HeaderSection({ title, children, handleFilter }: HeaderSectionProps) {
  return (
    <div
      className="w-full flex p-2 border border-gray-200 justify-between rounded-md
    bg-white items-center"
    >
      <div className="flex items-center gap-2">
        <h2 className="text-gray-800 font-bold text-xl">{title}</h2>
        {children}
      </div>
      <div className="flex items-center border border-gray-200 rounded-sm  
       min-w-0 bg-gray-100 w-[150px]">
        <input
          id="search"
          type="text"
          placeholder="pesquisar..."
          className="outline-none text-xs px-1 text-gray-700 w-full"
          onChange={handleFilter && ((e) => handleFilter(e.target.value))}
        />
        <div className="p-1 bg-[#031D3B] rounded-e-sm">
          <Search size={16} className="text-gray-50" />
        </div>
      </div>
    </div>
  );
}
