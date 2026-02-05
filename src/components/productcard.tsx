import { useState } from "react";
import { Modal } from "./modal";

export function ProductCard(){
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return(
        <>
        <div className="grid grid-cols-[auto_auto_auto] px-5 py-4 border-b border-gray-200 items-center justify-between">
            <h6 className="text-xl text-blue-950 font-bold">
                <button onClick={() => setIsOpen(true)}>Ouro</button>
            </h6>
            <h6 className=" text-blue-950 font-bold text-center px-4
            rounded-md bg-green-400/60 w-fit ml-5">
                R$ 350.00
            </h6>
            <div className="flex justify-end">
                <div className="flex items-center gap-4">
                    <span className="text-gray-400 font-semibold">1.200 g</span>
                    <div className="w-[100px] h-1 rounded-4xl bg-blue-950"/>
                    <span className="text-gray-400 font-semibold">56%</span>
                </div>
            </div>
        </div>
        <Modal tiltle="Atualizar Produto" open={isOpen} setOpen={setIsOpen} trigger={<></>}>
            <h2>teste</h2>
        </Modal>
        </>
    )
}

