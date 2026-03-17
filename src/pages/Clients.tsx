import { Table } from "../components/table";
import * as Dialog from "@radix-ui/react-dialog";
import { CreateClient } from "../components/forms/createclient";
import { PageWrapper } from "../components/pagewrapper";
import { Modal } from "../components/modal";
import { useEffect, useState } from "react";
import type { Client } from "../types/client";
import { deleteClient, getClients } from "../services/clientservice";
import { toast } from "sonner";
import type { TableColumn } from "../types/tablecolumn";
import { formatDate } from "../utils/dateFormater";
import { Loading } from "../components/loading";
import { Plus } from "lucide-react";

export function Clients() {
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [selectedEntity, setSelectedEntity] = useState<any | null>(null);

  const loadClients = async () => {
    try{
      setIsLoading(true);
      const response = await getClients();
      setClients(response);
      setFilteredClients(response)
    }catch(error){
      console.error(error)
      toast.error("Erro ao buscar clientes.")
    }
    finally{
      setIsLoading(false);
    }
  }

  const handleDeleteClient = async (id: number) => {
    const confirmed = window.confirm("Deseja realmente deletar esse cliente?");
    if(!confirmed){
      return;
    }
    try {
      await deleteClient(id);
      setClients((prev) => prev.filter(c => c.id !== id));
      toast.success("Cliente deletado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao deletar cliente.");
    }
  };

  const handleEdit = (entity: any) => {
    setSelectedEntity(entity);
    setIsEditOpen(true);
  }
  
  const handleFilter = (name: string) => {
    if(!name) {
      setFilteredClients(clients);
      return;
    }
    const result = clients.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));
    setFilteredClients(result);
  }

  const columns: TableColumn<Client>[] = [
    {
      align: "left",
      cssCustom: "py-1 px-2 rounded-sm bg-green-400/20",
      render: (c) => c.id
    },
    {
      render: (c) => c.name
    },
    {
      render: (c) => c.phone
    },
    {
      render: (c) => formatDate(c.createdAt)
    }
  ]

  useEffect(() => {
    loadClients();
  }, []);

  return (
    <PageWrapper
      headerTitle="Relojoaria Digital"
      sessionTitle="Clientes"
      handleFilter={handleFilter}
      componentsChildren={
        <div className="w-full px-6 py-8">
          {isloading ? (
            <div className="w-full flex justify-center">
              <Loading/>
            </div>
          ): clients && clients.length >= 1 ? (
            
            <div className="overflow-auto">
              <Table 
                data={filteredClients ?? []} 
                onDelete={handleDeleteClient} 
                onReaload={loadClients}
                onEdit={handleEdit}
                headElements={["Id", "NOME", "TELEFONE", "DATA DE CRIAÇÃO", "AÇÕES"]}
                columns={columns}
              >
              <Modal
                open={isEditOpen}
                setOpen={setIsEditOpen}
                tiltle="Editar Cliente"
                trigger={<></>}
              >
                {isEditOpen && selectedEntity && ( 
                  <CreateClient 
                    loadedClient={selectedEntity} 
                    isUpdate={true}
                    openModal={() => setIsEditOpen(false)}
                    onSuccess={loadClients}
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
              </Table>
            </div>
          ) : (
            <button 
              className="flex px-5 py-1 font-bold rounded-md bg-[#031D3B] text-gray-200
              justify-self-center hover:scale-95 transition-all duration-100 shadow-md gap-2"
              onClick={() => {setIsCreateOpen(true), setIsEditOpen(false)}}
            >
              Criar Cliente
              <Plus/>
            </button>
          )}
        </div>
      }
    >
      <Modal tiltle="Cadastro de Cliente" open={isCreateOpen} setOpen={setIsCreateOpen}>
        <CreateClient
          onLoading={setIsSubmiting}
          openModal={() => setIsCreateOpen(false)}
          onSuccess={loadClients}
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
        </CreateClient>
      </Modal>
    </PageWrapper>
  );
}
