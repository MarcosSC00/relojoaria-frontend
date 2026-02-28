import { Calendar } from "lucide-react";
import { Header } from "../components/header";

export function TaskDetails() {
    return(
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header title="Relojoaria Digital"/>
            <div className="flex flex-col w-[80%] md:w-[600px] gap-4 text-blue-950 rounded-md shadow-md bg-gray-50 mx-auto mt-10 p-5">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-bold">Titulo</h2>
                        <div className="flex gap-2 items-center bg-green-200 p-1 rounded-md">
                            <Calendar size={16}/>
                            <span className="text-xs font-medium">27/02/2026</span>
                        </div>
                    </div>
                    <span className="py-1 px-2 rounded-sm bg-green-200 font-bold">R$ 999.00</span>
                </div>
                <div className="flex flex-col gap-1">
                    <h4 className="text-md font-semibold">Descrição:</h4>
                    <p className="border border-blue-900/20 rounded-sm p-1 text-slate-600">descriler ifjelifef je eroi efjlej</p>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <h4 className="text-md font-semibold">Cliente:</h4>
                        <span className="capitalize">jupi</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <h4 className="text-md font-semibold">Status:</h4>
                        <span className="text-sm">PENDENTE</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <h4 className="text-md font-semibold">Tipo:</h4>
                        <span className="text-sm">Venda</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <h4 className="text-md font-semibold">Entrega:</h4>
                        <div className="flex gap-2 items-center">
                            <span className="text-xs font-medium">27/02/2026</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <h4 className="text-md font-semibold">Materiais Usados:</h4>
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                            <h4 className="font-semibold">Ouro</h4>
                            <span>20 gramas</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}