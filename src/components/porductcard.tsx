import { Pen } from "lucide-react";
import { CreateProduct } from "./forms/createproduct";
import { Modal } from "./modal";
import * as Dialog from "@radix-ui/react-dialog";
import { CreateStock } from "./forms/createstock";

export function ProductCard() {
  return (
    <div
      className="flex flex-col border border-gray-200 shadow-sm rounded-sm 
    w-[300px] p-1.5"
    >
      <div className="flex items-center p-2 justify-between bg-[#031D3B] rounded-sm">
        <h4 className="rounded-sm text-gray-50 font-semibold">Ouro</h4>
        <Modal
          tiltle="Editar Produto"
          trigger={
            <Dialog.Trigger
              className="p-1 rounded-sm border border-gray-300 hover:scale-90 0.5 transition-all
            duration-150"
            >
              <Pen className="text-gray-200" size={16} />
            </Dialog.Trigger>
          }
        >
          <CreateProduct>
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
          </CreateProduct>
        </Modal>
      </div>
      <div className="grid grid-cols-3 justify-between my-5">
        <div className="flex flex-col text-center">
          <div className="w-10 h-10 self-center">
            <img src="/icons8-bigorna-50.png" alt="" className="object-cover" />
          </div>

          <p className="text-sm font-semibold">
            Qtd.
            <br /> Usada:
          </p>
          <span className="text-sm font-normal mt-2">1.450,00</span>
        </div>
        <div className="flex flex-col text-center">
          <div className="w-8 h-8 mb-2 self-center">
            <img src="/icons8-armazém-64.png" alt="" className="object-cover" />
          </div>

          <h5 className="text-sm font-semibold">Qtd. Disponível:</h5>
          <span className="text-sm font-normal mt-2">1.450,00</span>
        </div>
        <div className="flex flex-col text-center">
          <div className="w-10 h-10 self-center">
            <img
              src="/icons8-fita-métrica-32.png"
              alt=""
              className="object-cover"
            />
          </div>

          <p className="text-sm font-semibold">Unid. de Medida:</p>
          <span className="text-sm font-normal mt-2">GRAMA</span>
        </div>
      </div>
      <Modal
        tiltle="Atualizar Estoque"
        trigger={
          <Dialog.Trigger
            className="p-1 rounded-sm bg-[#031D3B] text-gray-50 font-semibold
      hover:cursor-pointer hover:bg-[#021428] text-sm"
          >
            Atualizar Estoque
          </Dialog.Trigger>
        }
      >
        <CreateStock>
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
        </CreateStock>
      </Modal>
    </div>
  );
}
