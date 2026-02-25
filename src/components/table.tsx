import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Pen,
  Trash2,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import type { TableColumn } from "../types/tablecolumn";

interface TableProps{
  data: any;
  onDelete: (id: number) => void | Promise<void>;
  onReaload: () => Promise<void>;
  onEdit: (entity: any) => void;
  headElements: string[];
  columns: TableColumn<any>[];
  children: ReactNode;
}

export function Table({data, onDelete, children, onEdit, headElements, columns}: TableProps) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(data.length / 10)

  const handleEdit = (entity: any) => {
    onEdit(entity);
  }
  function goToNextPage() {
    setPage(page + 1)
  }

  function goToPreviousPage() {
    setPage(page - 1)
  }

  function goToFirstPage() {
    setPage(1)
  }

  function goToLastPage() {
    setPage(totalPages)
  }

  return (
    <>
    <table className="w-full text-sm overflow-auto">
      <thead>
        <tr className="justify-between border-b text-xs border-gray-300 uppercase bg-slate-200">
          {headElements.map((h, index) => 
            index == 0 ?
              <th className="px-4 py-3 text-left" key={index}>{h}</th> :
              <th className="px-4 py-3 text-center w-fit" key={index}>{h}</th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((d: any) => 
          <tr key={d.id} className="border-b border-gray-300 text-gray-600">
            {columns.map((col, index) => (
              <td className={`max-w-[90px] px-4 py-3 text-${col.align ?? "center"} truncate`} key={index}>
                <span className={`${col.cssCustom ?? ""} text-xs font-semibold`}>
                  {col.render(d)}
                </span>
              </td>
            ))}
            <td>
              <div className="flex gap-2 justify-center">
                
                <button
                  className="p-1 rounded-sm bg-blue-500 text-xs 
                  font-bold text-gray-100 hover:bg-blue-600"
                  onClick={() => handleEdit(d)}
                >
                  <Pen width={16}/>
                </button>
                <button
                  className="p-1 rounded-sm bg-red-500 text-xs
                  font-bold text-gray-100 hover:bg-red-600"
                  onClick={() => onDelete(d.id)}
                >
                  <Trash2 width={16}/>
                </button>
              </div>
            </td>
          </tr>
        )}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={headElements.length - 1} className="text-gray-400 py-2">
            <span className="ml-3">página {page} de {totalPages}</span>
          </td>
          <td colSpan={1} className="text-gray-400">
            <div className="text-center">
              <button 
                className="hover:text-gray-600" 
                onClick={goToFirstPage}
                disabled={page === 1}
              >
                <ChevronsLeft className="w-5" />
              </button>

              <button 
                className="hover:text-gray-600" 
                onClick={goToPreviousPage}
                disabled={page === 1}
              >
                <ChevronLeft className="w-5" />
              </button>

              <button 
                className="hover:text-gray-600" 
                onClick={goToNextPage}
                disabled={page === totalPages}
              >
                <ChevronRight className="w-5" />
              </button>

              <button 
                className="hover:text-gray-600" 
                onClick={goToLastPage}
                disabled={page === totalPages}
              >
                <ChevronsRight className="w-5" />
              </button>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
    {children}
  </>
  );
}
