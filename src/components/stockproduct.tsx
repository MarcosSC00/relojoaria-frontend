import { useState } from "react";
import type { TaskCustom } from "../types/task"
import { coinFormater } from "../utils/coinFormater";
import { CreateStock } from "./forms/createstock";
import { Modal } from "./modal";
import * as Dialog from "@radix-ui/react-dialog";

interface StockProductProps {
    tasks: TaskCustom[];
    productName: string;
    productId: number;
    productPrice: number;
    qtdCurrent: number;
    productUnit: string;
    onSuccess: () => Promise<void>;
}

export function StockProduct({
    tasks, 
    productId, 
    productName,
    productPrice,
    productUnit,
    qtdCurrent,
    onSuccess }: StockProductProps){

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);

    return (
        <div className="w-full h-full flex flex-col p-4">
            <div className="flex justify-between items-center px-1">
                <div className="flex gap-2 items-baseline">
                    <h4 className="text-xl font-bold capitalize">{productName}</h4>
                    <span className="h-fit text-xs px-2 rounded-sm bg-blue-900/80 text-gray-200"># {productId}</span>
                </div>
                <div>
                    <button 
                        className="px-4 py-1 text-xs rounded-md text-gray-200 bg-blue-900
                        font-semibold"
                        onClick={() => setIsOpen(true)}
                    >
                        Atualizar estoque
                    </button>
                </div>
            </div>
            <div className="flex mt-8 bg-gray-500/10
            rounded-md px-4 py-2 justify-between">
                <div className="flex flex-col">
                    <h6 className="text-sm font-bold">Qtd. Atual:</h6>
                    <span className="text-md text-slate-500 font-semibold">{qtdCurrent}</span>
                </div>
                <div className="flex flex-col">
                    <h6 className="text-sm font-bold">Preço:</h6>
                    <span className="text-md text-slate-500 font-semibold">{coinFormater(productPrice)}</span>
                </div>
                <div className="flex flex-col">
                    <h6 className="text-sm font-bold">Unidade:</h6>
                    <span className="text-md text-slate-500 font-semibold lowercase">{productUnit}</span>
                </div>
            </div>
            <div className="my-4 p-1">
                <h4 className="text-sm font-semibold">Serviços:</h4>
                {tasks && tasks.length >=1 ? (
                    <div className="w-full max-h-[109px] border-b border-t
                border-gray-200 overflow-y-scroll">
                    <div className="grid grid-cols-[auto_1fr_1fr_1fr] text-center border-b border-gray-200
                    bg-blue-900 px-4 text-gray-200">
                        <span className="text-sm font-semibold px-2">Id</span>
                        <span className="text-sm font-semibold">Título</span>
                        <span className="text-sm font-semibold">Qtd. usada</span>
                        <span className="text-sm font-semibold text-end">Valor</span>
                    </div>
                    {tasks ? tasks.map((t) => (
                        <div key={t.id} className="grid grid-cols-[auto_1fr_1fr_1fr] text-center px-4 py-1 border-b border-gray-200">
                            <h6 className="text-xs font-normal px-2 bg-green-600/40 rounded-md">{t.id}</h6>
                            <h6 className="max-w-[100px] ml-10 text-left text-sm font-normal truncate">{t.title}</h6>
                            <h6 className="text-sm font-semibold">{t.qtdProductUsed}</h6>
                            <h6 className="text-sm font-semibold text-end text-blue-600">{coinFormater(t.totalProductPrice)}</h6>
                        </div>
                    )): <h4>Nenhuma tarefa relacionada.</h4>}
                </div>
                ) : <span className="text-xs text-red-500">
                        Não possui serviços.
                    </span>}
            </div>
            <Modal tiltle="Atualização de estoque" 
                open={isOpen} 
                setOpen={setIsOpen}
                trigger={<></>}>
                    <CreateStock
                      onLoading={setIsSubmiting}
                      openModal={() => setIsOpen(false)}
                      onSuccess={onSuccess}
                      isUpdate={true}
                      loadedStock={productName}
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
                          className={`p-1 ${
                          isSubmiting
                          ? "bg-[#85a0bf] hover:cursor-none border-[#85a0bf]"
                          : "bg-[#031D3B]  hover:bg-[#020F1F]"
                          } border border-[#031D3B] rounded-md text-gray-50 font-semibold
                          transition-colors duration-150
                          hover:cursor-pointer text-sm`}
                        >
                          {isSubmiting ? "SALVANDO..." : "SALVAR"}
                        </button>
                      </div>
                    </CreateStock>
                  </Modal>
        </div>
    )
}