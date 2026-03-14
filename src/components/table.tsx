import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye,
  Pen,
  Trash2,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import type { TableColumn } from "../types/tablecolumn";
import { Link } from "react-router";

interface TableProps{
  data: any;
  onDelete: (id: number) => void | Promise<void>;
  onReaload: () => Promise<void>;
  onEdit: (entity: any) => void;
  headElements: string[];
  columns: TableColumn<any>[];
  children: ReactNode;
}

export function Table({data, onDelete, children, 
  onEdit, headElements, columns}: TableProps) {
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
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b text-xs border-gray-300 uppercase bg-slate-200 text-nowrap">
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
                  className=" rounded-sm text-xs 
                  font-bold text-blue-500"
                  onClick={() => handleEdit(d)}
                >
                  <Pen width={14}/>
                </button>
                <button
                  className=" rounded-sm text-xs
                  font-bold text-red-500"
                  onClick={() => onDelete(d.id)}
                >
                  <Trash2 width={14}/>
                </button>
                <Link
                  className=" rounded-sm text-xs
                  font-bold text-green-500"
                  to={`details/${d.id}`}
                >
                  <Eye width={14}/>
                </Link>
              </div>
            </td>
          </tr>
        )}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={window.innerWidth >= 768 ? headElements.length - 1: headElements.length - 2} className="text-gray-400 py-2">
            <span className="ml-3">página {page} de {totalPages}</span>
          </td>
          <td colSpan={window.innerWidth >= 768 ? 1:2} className="text-gray-400">
            <div className="text-right md:text-center">
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
