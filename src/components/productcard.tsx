import { useState } from "react";
import { Modal } from "./modal";
import { Pen, Trash2 } from "lucide-react";
import type { ProductRequest, ProductResponse } from "../types/product";
import { CreateProduct } from "./forms/createproduct";
import * as Dialog from "@radix-ui/react-dialog"

interface ProductCardProps extends ProductResponse{
    onDelete: (name: string) => Promise<void>
    onReaload: () => Promise<void>
    isSubmiting: boolean
}

export function ProductCard({name, price, unit, onDelete, onReaload, isSubmiting}: ProductCardProps){
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedEntity, setSelectedEntity] = useState<ProductRequest | null>(null);

    const handleEdit = (entity: any) => {
        setSelectedEntity(entity);
        setIsOpen(true);
    }
    return(
        <>
        <div className="grid grid-cols-4 px-5 py-4 border-b border-gray-200 items-center justify-between">
            <h6 className="text-[18px] text-slate-800 font-bold relative">
                <button onClick={() => setIsOpen(true)}>{name}</button>
            </h6>
            <h6 className="text-sm text-slate-800 font-bold text-center px-4
            rounded-md bg-green-400/60 w-[100px] justify-self-center">
                {`R$ ${price}`}
            </h6>
            <h6 className="text-gray-400 font-semibold text-center px-4 lowercase">{unit}</h6>
            <div className="flex gap-2 justify-end">
                
                <button
                  className="p-1 rounded-sm bg-blue-500 text-xs
                  font-bold text-gray-100 hover:bg-blue-600"
                  onClick={() => handleEdit({name, unit, price})}
                >
                  <Pen width={16} height={16}/>
                </button>
                <button
                  className="p-1 rounded-sm bg-red-500 text-xs
                  font-bold text-gray-100 hover:bg-red-600"
                  onClick={() => onDelete(name)}
                >
                  <Trash2 width={16} height={16}/>
                </button>
              </div>
        </div>
        <Modal 
            tiltle="Atualizar Produto" 
            open={isOpen} 
            setOpen={setIsOpen} 
            trigger={<></>}
        >
            {selectedEntity && (
                <CreateProduct
                    loadedProduct={selectedEntity} 
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
                    </CreateProduct>
            )}
        </Modal>
        </>
    )
}

