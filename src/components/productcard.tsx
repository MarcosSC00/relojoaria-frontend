import { useState } from "react";
import { Modal } from "./modal";
import { Pen, Trash2 } from "lucide-react";
import type { ProductResponse } from "../types/product";

interface ProductCardProps extends ProductResponse{
    onDelete: (name: string) => Promise<void>
}

export function ProductCard({name, price, unit, id, onDelete}: ProductCardProps){
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedEntity, setSelectedEntity] = useState<any | null>(null);

    const handleEdit = (entity: any) => {
        setSelectedEntity(entity);
        setIsOpen(true);
    }
    return(
        <>
        <div className="grid grid-cols-4 px-5 py-4 border-b border-gray-200 items-center justify-between">
            <h6 className="text-[18px] text-slate-800 font-bold">
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
                  onClick={() => handleEdit(id)}
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
        <Modal tiltle="Atualizar Produto" open={isOpen} setOpen={setIsOpen} trigger={<></>}>
            <h2>teste</h2>
        </Modal>
        </>
    )
}

