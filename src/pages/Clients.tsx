import { Table } from "../components/table";
import * as Dialog from "@radix-ui/react-dialog";
import { CreateClient } from "../components/forms/createclient";
import { PageWrapper } from "../components/pagewrapper";
import { Modal } from "../components/modal";
import { useEffect, useState } from "react";
import type { Client } from "../types/client";
import { deleteClient, getClients } from "../services/clientservice";
import { toast } from "sonner";

export function Clients() {
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [clients, setClients] = useState<Client[]>([]);

  const loadClients = async () => {
    try{
      const response = await getClients();
      setClients(response)
    }catch(error){
      console.error(error)
      toast.error("Erro ao buscar clientes.")
    }
  }

  const handleDeleteClient = async (id: number) => {
    try {
      await deleteClient(id);
      setClients((prev) => prev.filter(c => c.id !== id));
      toast.success("Cliente deletado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao deletar cliente.");
    }
  };

  useEffect(() => {
    loadClients();
  }, [])

  return (
    <PageWrapper
      headerTitle="Relojoaria Digital"
      sessionTitle="Clientes"
      componentsChildren={
        <div className="w-full px-6 py-8">
          <Table 
            data={clients ?? []} 
            onDelete={handleDeleteClient} 
            onReaload={loadClients}
            headElements={["Id", "NOME", "TELEFONE", "DATA DE CRIAÇÃO", "AÇÕES"]} />
        </div>
      }
    >
      <Modal tiltle="Cadastro de Cliente" open={isOpen} setOpen={setIsOpen}>
        <CreateClient
          onLoading={setIsSubmiting}
          openModal={() => setIsOpen(false)}
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
