import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Modal } from "./modal";
import { CreateClient } from "./forms/createclient";
import * as Dialog from "@radix-ui/react-dialog";

const client = {
  name: "marcos",
  phone: "(99) 99999-9999",
};

export function Table() {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b text-xs border-gray-300 uppercase">
          <th className="px-4 py-3 text-left">NOME</th>
          <th className="px-4 py-3 text-center">TELEFONE</th>
          <th className="px-4 py-3 text-center">DATA</th>
          <th className="px-4 py-3 text-center">AÇÕES</th>
        </tr>
      </thead>
      <tbody>
        <tr className="text-center border-b border-gray-300 text-gray-600">
          <td className="text-left px-4 capitalize">marcos</td>
          <td className="py-3">99999-9999</td>
          <td className="py-3">05/02/2000</td>
          <td>
            <div className="flex gap-2 justify-center">
              <Modal
                tiltle="Editar Cliente"
                trigger={
                  <Dialog.Trigger
                    className="p-1 rounded-sm bg-blue-500 text-xs 
              font-bold text-gray-100 hover:bg-blue-600"
                  >
                    Editar
                  </Dialog.Trigger>
                }
              >
                <CreateClient loadedClient={client}>
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
              </Modal>

              <button
                className="p-1 rounded-sm bg-red-500 text-xs
              font-bold text-gray-100 hover:bg-red-600"
              >
                DELETAR
              </button>
            </div>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3} className="text-gray-400 py-2">
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
  );
}
