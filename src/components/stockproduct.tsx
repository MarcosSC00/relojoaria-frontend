export function StockProduct(){
    return (
        <div className="w-full h-full flex flex-col p-4">
            <div className="flex justify-between items-center px-1">
                <div className="flex gap-2 items-baseline">
                    <h4 className="text-xl font-bold">Ouro</h4>
                    <span className="h-fit text-xs px-2 rounded-sm bg-blue-900 text-gray-200">#33</span>
                </div>
                <div>
                    <button className="px-4 py-1 text-xs rounded-md text-gray-200 bg-blue-900
                    font-semibold">
                        Atualizar estoque
                    </button>
                </div>
            </div>
            <div className="flex mt-8 bg-gray-500/10
            rounded-md px-4 py-2 justify-between">
                <div className="flex flex-col">
                    <h6 className="text-sm font-semibold">Qtd. Atual:</h6>
                    <span className="text-md font-semibold">R$ 550.00</span>
                </div>
                <div className="flex flex-col">
                    <h6 className="text-sm font-semibold">Preço:</h6>
                    <span className="text-md font-semibold">R$ 550.00</span>
                </div>
                <div className="flex flex-col">
                    <h6 className="text-sm font-semibold">Unidade:</h6>
                    <span className="text-md font-semibold">R$ 550.00</span>
                </div>
            </div>
            <div className="my-4 p-1">
                <h4 className="text-sm font-semibold">Serviços:</h4>
                <div className="w-full max-h-[109px] border-b border-t
                border-gray-200 overflow-y-scroll">
                    <div className="grid grid-cols-[auto_1fr_1fr_1fr] text-center border-b border-gray-200
                    bg-blue-900 px-4 text-gray-200">
                        <span className="text-sm font-semibold px-2">Id</span>
                        <span className="text-sm font-semibold">Título</span>
                        <span className="text-sm font-semibold">Qtd. usada</span>
                        <span className="text-sm font-semibold text-end">Valor</span>
                    </div>
                    <div className="grid grid-cols-[auto_1fr_1fr_1fr] text-center px-4 py-1 border-b border-gray-200">
                        <h6 className="text-xs font-normal px-2 bg-green-600/40 rounded-md">Id</h6>
                        <h6 className="text-sm font-normal">Nome tarefa</h6>
                        <h6 className="text-sm font-semibold">1.200</h6>
                        <h6 className="text-sm font-semibold text-end text-blue-600">R$ 3.500</h6>
                    </div>
                    <div className="grid grid-cols-[auto_1fr_1fr_1fr] text-center px-4 py-1 border-b border-gray-200">
                        <h6 className="text-xs font-normal px-2 bg-green-600/40 rounded-md">Id</h6>
                        <h6 className="text-sm font-normal">Nome tarefa</h6>
                        <h6 className="text-sm font-semibold">1.200</h6>
                        <h6 className="text-sm font-semibold text-end text-blue-600">R$ 3.500</h6>
                    </div>
                    <div className="grid grid-cols-[auto_1fr_1fr_1fr] text-center px-4 py-1 border-b border-gray-200">
                        <h6 className="text-xs font-normal px-2 bg-green-600/40 rounded-md">Id</h6>
                        <h6 className="text-sm font-normal">Nome tarefa</h6>
                        <h6 className="text-sm font-semibold">1.200</h6>
                        <h6 className="text-sm font-semibold text-end text-blue-600">R$ 3.500</h6>
                    </div>
                    <div className="grid grid-cols-[auto_1fr_1fr_1fr] text-center px-4 py-1 border-b border-gray-200">
                        <h6 className="text-xs font-normal px-2 bg-green-600/40 rounded-md">Id</h6>
                        <h6 className="text-sm font-normal">Nome tarefa</h6>
                        <h6 className="text-sm font-semibold">1.200</h6>
                        <h6 className="text-sm font-semibold text-end text-blue-600">R$ 3.500</h6>
                    </div>
                    <div className="grid grid-cols-[auto_1fr_1fr_1fr] text-center px-4 py-1 border-b border-gray-200">
                        <h6 className="text-xs font-normal px-2 bg-green-600/40 rounded-md">Id</h6>
                        <h6 className="text-sm font-normal">Nome tarefa</h6>
                        <h6 className="text-sm font-semibold">1.200</h6>
                        <h6 className="text-sm font-semibold text-end text-blue-600">R$ 3.500</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}