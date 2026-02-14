import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Pen,
  Trash2,
} from "lucide-react";
import { Modal } from "./modal";
import { CreateClient } from "./forms/createclient";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import type { TableColumn } from "../types/tablecolumn";

interface TableProps{
  data: any;
  onDelete: (id: number) => void | Promise<void>;
  onReaload: () => Promise<void>;
  headElements: string[];
  columns: TableColumn<any>[];
}

export function Table({data, onDelete, onReaload, headElements, columns}: TableProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedEntity, setSelectedEntity] = useState<any | null>(null);
  const handleEdit = (entity: any) => {
    setSelectedEntity(entity);
    setIsOpen(true);
  }

  return (
    <>
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b text-xs border-gray-300 uppercase bg-slate-200">
          {headElements.map((h, index) => 
            index == 0 ?
              <th className="px-4 py-3 text-left" key={index}>{h}</th> :
              <th className="px-4 py-3 text-center">{h}</th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((d: any) => 
          <tr key={d.id} className="text-center border-b border-gray-300 text-gray-600">
            {columns.map((col) => (
              <td className={`px-4 py-3 text-${col.align ?? "center"}`}>
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
            <span className="ml-3">página 1 de 10</span>
          </td>
          <td colSpan={1} className="text-gray-400">
            <div className="text-center">
              <button className="hover:text-gray-600">
                <ChevronsLeft className="w-5" />
              </button>

              <button className="hover:text-gray-600">
                <ChevronLeft className="w-5" />
              </button>

              <button className="hover:text-gray-600">
                <ChevronRight className="w-5" />
              </button>

              <button className="hover:text-gray-600">
                <ChevronsRight className="w-5" />
              </button>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>

    <Modal
      open={isOpen}
      setOpen={setIsOpen}
      tiltle="Editar Cliente"
      trigger={<></>}
    >
      {selectedEntity && ( 
        <CreateClient 
          loadedClient={selectedEntity} 
          isUpdate={true}
          openModal={() => setIsOpen(false)}
          onSuccess={onReaload}
        >
          <div className="flex justify-end gap-2 mt-5">
            <Dialog.Close
              className="p-1 border border-gray-300 rounded-md text-[#031D3B] font-semibold
            hover:bg-gray-200 transition-colors duration-150
              hover:cursor-pointer text-sm"
            >
              CANCELAR
            </Dialog.Close>
              <button
                type="submit"
                className="p-1 bg-[#031D3B] border border-[#031D3B] rounded-md text-gray-50 font-semibold
              hover:bg-[#020F1F] transition-colors duration-150
                hover:cursor-pointer text-sm"
              >
                SALVAR
              </button>
          </div>
        </CreateClient>
      )}
    </Modal>
  </>
  );
}
