import { Calendar, PencilIcon, Trash } from "lucide-react";
import { Header } from "../components/header";
import { useEffect, useState } from "react";
import type { ClientWithServices } from "../types/client";
import { toast } from "sonner";
import { useNavigate ,useParams } from "react-router";
import { deleteClient, getClientWithServices } from "../services/clientservice";
import { formatDate } from "../utils/dateFormater";
import { CreateClient } from "../components/forms/createclient";
import * as Dialog from "@radix-ui/react-dialog";
import { Modal } from "../components/modal";
import { coinFormater } from "../utils/coinFormater";

export function  ClientDetails() {
    const [client, setClient] = useState<ClientWithServices>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const {clientId} = useParams();
    const navigate = useNavigate();

    const loadClient = async (id: number) => {
        setIsLoading(true);
        try {
            const result = await getClientWithServices(id);
            setClient(result);
        } catch (error) {
            toast.error("Erro ao carregar cliente.", {id:"loadClientError"});
            console.error(error);
        }finally{
            setIsLoading(false);
        }
    }

    const handleEdit = () => {
        setIsEditOpen(true);
    }

    const handleDeleteClient = async (id: number) => {
        const confirmed = window.confirm("Deseja realmente excluir esse cliente?");
        if(!confirmed) {
            return;
        }
        try {
            await deleteClient(id);
            toast.success("Cliente deletado com sucesso.", {id: "clientSuccessEdit"});
            navigate("/clients", {replace: true})
        } catch (error) {
            toast.error("Erro ao deletar cliente.", {id: "clientErrorDelete"});
            console.error(error);
        }
    }

    useEffect(() => {
        if(clientId)
            loadClient(parseInt(clientId));
    }, [clientId]);
    return(
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header title="Relojoaria Digital"/>
            {client && !isLoading ? (
                <div className="flex flex-col w-[80%] md:w-[600px] gap-4 
                text-blue-950 rounded-md shadow-md bg-gray-50 mx-auto mt-10 p-5">
                <div className="flex justify-between items-center gap-2.5">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <span className="text-xs p-1 rounded-sm bg-blue-200 font-bold">
                                {`#${client.id}`}
                            </span>
                            <h2 className="text-2xl font-bold capitalize">
                                {client.name}
                            </h2>
                        </div>
                        <div className="flex gap-2 items-center bg-green-200 p-1 rounded-md">
                            <Calendar size={16}/>
                            <span className="text-xs font-bold">{formatDate(client.createdAt)}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 font-semibold">
                        <h6>Valor em serviços:</h6>
                        <span className="py-1 px-2 rounded-sm bg-green-200 font-bold">
                            {coinFormater(client.services.reduce((acc, cur) => acc + cur.amountService
                        ,0) ?? 0)}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <h4 className="text-md font-bold">Telefone/Celular:</h4>
                    <p className="border border-blue-900/20 rounded-sm p-1 text-slate-600">{client.phone}</p>
                </div>
                <div className="flex flex-col">
                    <h4 className="text-md font-bold">Serviços:</h4>
                    <div className="">
                        {client.services && client.services.length >= 1? (
                            <table className="mt-2 w-full text-sm overflow-auto">
                            <thead>
                                <tr className="bg-gray-300">
                                    <th>Id</th>
                                    <th>Título</th>
                                    <th>Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {client.services.map((s, index) => (
                                    <tr className="text-center border-b border-gray-200" key={index}>
                                        <td className="truncate py-1">{s.id}</td>
                                        <td className="truncate">{s.title}</td>
                                        <td>{coinFormater(s.amountService)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        ) : (
                            <span className="text-xs text-red-500">
                                Não possui serviços.
                            </span>
                        )}
                        <div className="flex items-center gap-2 justify-end mt-5">
                            <button 
                                onClick={handleEdit}
                                className="flex items-center gap-1 py-1 px-4
                              bg-blue-900 rounded-md text-gray-200 hover:bg-blue-950">
                                <span className="font-semibold text-sm">Editar</span>
                                <PencilIcon size={18} />
                            </button>
                            <button 
                                className="flex items-center gap-1 py-1 px-4
                              bg-red-500 rounded-md text-gray-200 hover:bg-red-600"
                                onClick={() => handleDeleteClient(client.id)}
                            >
                                <span className="font-semibold text-sm">Excluir</span>
                                <Trash size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            ) :(
                <span className="m-auto text-xl font-semibold text-gray-600">
                    Cliente não encontrado.
                </span>
            )}
             <Modal
                open={isEditOpen}
                setOpen={setIsEditOpen}
                tiltle="Editar Cliente"
                trigger={<></>}
            >
                {isEditOpen && client && (
                    <CreateClient 
                        loadedClient={client} 
                        isUpdate={true}
                        openModal={() => setIsEditOpen(false)}
                        onSuccess={() => loadClient(client.id)}
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
            
        </div>
    )
}