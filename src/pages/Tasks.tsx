import { useEffect, useState } from "react";
import { PageWrapper } from "../components/pagewrapper";
import { Table } from "../components/table";
import { deleteTask, getAllTasks, updateStatus } from "../services/taskservice";
import type { TaskResponse } from "../types/task";
import { toast } from "sonner";
import { Modal } from "../components/modal";
import { CreateTask } from "../components/forms/createtask";
import * as Dialog from "@radix-ui/react-dialog"
import type { TableColumn } from "../types/tablecolumn";
import { formatDate } from "../utils/dateFormater";
import { coinFormater } from "../utils/coinFormater";
import { statusConversor,revertStatusConversor } from "../utils/statusConversor";

export function Tasks(){
  const [tasks, setTasks] = useState<TaskResponse[]>([])
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<any | null>(null);

  const loadTasks = async () => {
    try{
      const response = await getAllTasks();
      setTasks(response)
    }catch(error){
      console.error(error)
      toast.error("Erro ao buscar clientes.")
    }
  }

  const status = ["PENDENTE", "FEITO", "EM ANDAMENTO"];

  const getStatusColor = (status: string) => {
  switch (status) {
    case "DONE":
      return "text-green-600";
    case "IN_PROGRESS":
      return "text-yellow-600";
    case "TODO":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

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

  const handleUpdateStatus = async (id: number, status: string) => {
    try{
      await updateStatus(id, status);
      setTasks(prev =>
        prev.map(task =>
        task.id === id ? { ...task, status } : task
      ));
      toast.success("Status atualizado com sucesso.");
    }catch(error){
      console.error("Erro ao atualizar status");
      toast.error("Erro ao atualizar status.");
    }
  } 

  const handleEdit = (entity: any) => {
    setSelectedEntity(entity);
    setIsEditOpen(true);
  }

  const columns: TableColumn<TaskResponse>[] = [
    {
      render: (t) => t.id,
      align: "left",
      cssCustom: "py-1 px-2 rounded-sm bg-green-400/20"
    },
    { 
      render: (t) => t.title, 
      align:"left",
    },
    { render: (t) => t.clientName},
    { render: (t) => formatDate(t.createdAt)},
    { render: (t) => coinFormater(t.totalPrice)},
    { 
      render: (t) => 
      <select 
        id={`status${t.id}`} 
        className={`outline-none ${getStatusColor(t.status)}`} 
        value={t.status}
        onChange={(e) => handleUpdateStatus(t.id, e.target.value)}
      >
        <option value={t.status}>{statusConversor(t.status)}</option>
        {status.filter(s=>s !== statusConversor(t.status)).map((s, index) => (
          <option value={revertStatusConversor(s)} key={index} className="text-gray-800">{s}</option>
        ))}
      </select>,
      
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
            onEdit={handleEdit}
            headElements={["ID", "TÍTULO", "Cliente", "DATA DE CRIAÇÃO", "Valor", "status", "ações"]}
            columns={columns}
            pathDetails={`details`}
          >
            <Modal
              open={isEditOpen}
              setOpen={setIsEditOpen}
              tiltle="Editar Cliente"
              trigger={<></>}
            >
              {isEditOpen && selectedEntity && ( 
                <CreateTask 
                  loadedTask={selectedEntity} 
                  isUpdate={true}
                  openModal={() => setIsEditOpen(false)}
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
          </Table>
        </div>
      }
    >
      <Modal tiltle="Cadastro de Serviço" open={isCreateOpen} setOpen={setIsCreateOpen}>
        <CreateTask
          onLoading={setIsSubmiting}
          openModal={() => setIsCreateOpen(false)}
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