import { Calendar, PencilIcon, Trash } from "lucide-react";
import { Header } from "../components/header";
import type { TaskResponse } from "../types/task";
import { useNavigate, useParams } from "react-router";
import { deleteTask, getTaskById } from "../services/taskservice";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { coinFormater } from "../utils/coinFormater";
import { formatDate } from "../utils/dateFormater";
import { statusConversor } from "../utils/statusConversor";
import { Modal } from "../components/modal";
import { CreateTask } from "../components/forms/createtask";
import * as Dialog from "@radix-ui/react-dialog";
import { Footer } from "../components/footer";

export function TaskDetails() {
    const [task, setTask] = useState<TaskResponse>();
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {taskId} = useParams();
    const navigate = useNavigate();
    const loadTask = async (taskId: number) => {
        try {
            setIsLoading(true)
            const task = await getTaskById(taskId);
            setTask(task);
            toast.success("Serviço carregado com sucesso.",{id:"loadtask"});
        } catch (error) {
            toast.error("Erro ao carregar serviço.", {id:"loadError"})
            console.error(error);
        }finally{
            setIsLoading(false);
        }
    }

    const handleEdit = () => {
        setIsEditOpen(true);
    }
    const handleDeleteTask = async (id: number) => {
        const confirmed = window.confirm("Tem certeza que deseja deletar este serviço?");
      
        if (!confirmed) return;
    
        try {
          await deleteTask(id);
          toast.success("Serviço deletado com sucesso!");
          navigate("/services", {replace: true});
        } catch (error) {
          console.error(error);
          toast.error("Erro ao deletar serviço.");
        }
      };

      
    useEffect(() => {
        if(taskId)
            loadTask(parseInt(taskId));
    },[taskId]);
    return(
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header title="Relojoaria Digital"/>
            {task && !isLoading ? (
                <div className="flex flex-col w-[90%] md:w-[600px] gap-4 
            text-blue-950 rounded-md shadow-md bg-gray-50 mx-auto mt-10 p-5
            max-h-[500px] overflow-auto mb-10">
                <div className="flex items-baseline justify-between md:items-center gap-2.5">
                    <div className="w-full flex items-center justify-between">
                        <h2 className="text-xl font-bold capitalize">
                            <span className="mr-2 p-0.5 rounded-sm bg-green-200
                            ">
                                {`#${task.id}`}
                            </span>
                            {task.title}
                        </h2>
                        <div className="flex gap-2 items-center bg-green-200 p-1 rounded-md">
                            <Calendar size={16}/>
                            <span className="text-xs font-bold">{formatDate(task.createdAt)}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-bold">Descrição:</h4>
                    <p className="border border-blue-900/20 rounded-sm p-1 text-slate-600">{task.description}</p>
                </div>
                <div className="flex flex-wrap items-center justify-between 
                gap-x-5 md:gap-0">
                    <div className="flex items-baseline gap-1">
                        <h4 className="text-sm font-bold">Cliente:</h4>
                        <span className="capitalize font-medium text-slate-500">{task.clientName}</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                        <h4 className="text-sm font-bold">Status:</h4>
                        <span className="text-sm font-medium text-slate-500 capitalize">{statusConversor(task.status)}</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                        <h4 className="text-sm font-bold">Tipo:</h4>
                        <span className="text-sm font-medium text-slate-500">{task.type === "SALE" ? "Venda" : "Conserto"}</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                        <h4 className="text-sm font-bold">Entrega:</h4>
                        <div className="flex gap-2 items-center">
                            <span className="text-sm font-medium text-slate-500">{formatDate(task.endDate)}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-1 p-1">
                    <h4 className="text-sm font-bold">Materiais Usados:</h4>
                    {task.items && task.items.length >= 1 ? (
                        <div className="flex items-center gap-2 flex-wrap">
                            <table className="mt-2 w-full text-sm overflow-auto">
                                <thead>
                                    <tr className="bg-green-200">
                                        <th>Produto</th>
                                        <th>Quantidade</th>
                                        <th>Valor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {task?.items.map((i, index) => (
                                        <tr key={index} className="text-center border-b border-gray-200">
                                            <td className="truncate p-1">{i.productName}</td>
                                            <td className="truncate lowercase">{`${i.quantityUsed} ${i.unit}(s)`}</td>
                                            <td className="truncate">{coinFormater(i.subTotal)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                    </div>
                    ) : (
                        <span className="text-xs text-red-500">
                            Sem uso de materiais.
                        </span>
                    )}
                </div>

                <div className="flex flex-col">
                    <h4 className="text-sm font-bold">Subserviços:</h4>
                    <div className="">
                        {task.subServices && task.subServices.length >= 1? (
                            <table className="mt-2 w-full text-sm overflow-auto">
                            <thead>
                                <tr className="bg-gray-300">
                                    <th>Titulo</th>
                                    <th>Descrição</th>
                                    <th>Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {task.subServices.map((s, index) => (
                                    <tr className="text-center border-b border-gray-200" key={index}>
                                        <td className="truncate py-1">{s.title}</td>
                                        <td className="truncate">{s.description}</td>
                                        <td>{coinFormater(s.price)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        ) : (
                            <span className="text-xs text-red-500">
                                Não possui subserviços.
                            </span>
                        )}
                        <div className="flex items-baseline gap-2 mt-2">
                            <h4 className="text-sm font-bold">Valor adicional:</h4>
                            <div className="flex gap-2 items-center">
                                <span className="text-sm text-slate-700 font-bold px-2 bg-green-200
                                rounded-sm">
                                    {task.addValue ? coinFormater(task.addValue)
                                    : coinFormater(0)}
                                </span>
                            </div>
                        </div>
                        
                        <div className="mt-5 flex items-center gap-2 font-semibold bg-green-200
                        justify-between px-1 py-1 text-sm">
                            <h6 className="font-bold">Valor Total:</h6>
                            <span className="rounded-sm font-bold
                            ">
                                {coinFormater(task.totalPrice ?? 0)}
                            </span>
                        </div>
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
                                onClick={() => handleDeleteTask(task.id)}
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
                    Serviço não encontrado.
                </span>
            )}

            <Modal
                open={isEditOpen}
                setOpen={setIsEditOpen}
                tiltle="Editar Cliente"
                trigger={<></>}
            >
                {isEditOpen && task && ( 
                    <CreateTask 
                        loadedTask={task} 
                        isUpdate={true}
                        openModal={() => setIsEditOpen(false)}
                        onSuccess={() => loadTask(task.id)}
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
                    </CreateTask>
                )}
            </Modal>
            <Footer/>
        </div>
    )
}