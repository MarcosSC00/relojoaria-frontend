import { useEffect, useState } from "react";
import { PageWrapper } from "../components/pagewrapper";
import { Table } from "../components/table";
import { deleteTask, getAllTasks } from "../services/taskservice";
import type { TaskResponse } from "../types/task";
import { toast } from "sonner";
import { Modal } from "../components/modal";
import { CreateTask } from "../components/forms/createtask";
import * as Dialog from "@radix-ui/react-dialog"
import type { TableColumn } from "../types/tablecolumn";
import { formatDate } from "../utils/dateFormater";
import { coinFormater } from "../utils/coinFormater";
import { statusConversor } from "../utils/statusConversor";

export function Tasks(){
  const [tasks, setTasks] = useState<TaskResponse[]>([])
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const loadTasks = async () => {
    try{
      const response = await getAllTasks();
      setTasks(response)
    }catch(error){
      console.error(error)
      toast.error("Erro ao buscar clientes.")
    }
  }

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter(p => p.id !== id));
      toast.success("Serviço deletado com sucesso!")
    } catch (error) {
      console.error(error);
      toast.error("Erro ao deletar serviço.")
    }
  }

  const columns: TableColumn<TaskResponse>[] = [
    {
      render: (t) => t.id,
      align: "left",
      cssCustom: "py-1 px-2 rounded-sm bg-green-400/20"
    },
    { render: (t) => t.title },
    { render: (t) => t.clientName},
    { render: (t) => formatDate(t.createdAt)},
    { render: (t) => coinFormater(t.totalPrice)},
    { 
      render: (t) => <span className={`${t.status == "TODO" ? "text-red-600": 
        t.status == "DONE" ? "text-green-600" : "text-blue-600"
      }`}>{statusConversor(t.status)}</span>,
    },
  ]

  useEffect(() => {
    loadTasks();
  }, [])
  return(
    <PageWrapper
      headerTitle="Relojoaria Digital"
      sessionTitle="Serviços"
      componentsChildren={
        <div className="w-full max-h-screen px-6 py-8">
          <Table 
            data={tasks ?? []} 
            onDelete={handleDeleteTask} 
            onReaload={loadTasks}
            headElements={["ID", "TÍTULO", "Cliente", "DATA DE CRIAÇÃO", "Valor", "status", "ações"]}
            columns={columns}
          />
        </div>
      }
    >
      <Modal tiltle="Cadastro de Serviço" open={isOpen} setOpen={setIsOpen}>
        <CreateTask
          onLoading={setIsSubmiting}
          openModal={() => setIsOpen(false)}
          onSuccess={loadTasks}
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
              disabled={isSubmiting}
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
        </CreateTask>
      </Modal>
    </PageWrapper>
  );
}