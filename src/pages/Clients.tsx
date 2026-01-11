import { Table } from "../components/table";
import * as Dialog from "@radix-ui/react-dialog";
import { CreateClient } from "../components/forms/createclient";
import { PageWrapper } from "../components/pagewrapper";
import { Modal } from "../components/modal";
import { useState } from "react";

export function Clients() {
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <PageWrapper
      headerTitle="Relojoaria Digital"
      sessionTitle="Clientes"
      componentsChildren={
        <div className="w-full px-6 py-8">
          <Table />
        </div>
      }
    >
      <Modal tiltle="Cadastro de Cliente" open={isOpen} setOpen={setIsOpen}>
        <CreateClient
          onLoading={setIsSubmiting}
          openModal={() => setIsOpen(false)}
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
