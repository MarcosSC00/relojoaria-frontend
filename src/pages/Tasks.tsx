import { useEffect, useState } from "react";
import { PageWrapper } from "../components/pagewrapper";
import { Table } from "../components/table";
import { deleteTask, getAllTasks } from "../services/taskservice";
import type { TaskResponse } from "../types/task";
import { toast } from "sonner";
import { Modal } from "../components/modal";
import { CreateTask } from "../components/forms/createtask";
import * as Dialog from "@radix-ui/react-dialog"

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
      toast.success("Serviço cadastrado com sucesso!")
    } catch (error) {
      console.error(error);
      toast.error("Erro ao cadastrar serviço.")
    }
  }

  useEffect(() => {
    loadTasks();
  }, [])
  return(
    <PageWrapper
      headerTitle="Relojoaria Digital"
      sessionTitle="Serviços"
      componentsChildren={
        <div className="w-full px-6 py-8">
          <Table 
            data={tasks ?? []} 
            onDelete={handleDeleteTask} 
            onReaload={loadTasks}
            headElements={["TÍTULO", "Cliente", "DATA DE CRIAÇÃO", "Valor", "status",
              "tipo", "ações"
            ]} />
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