import { CreateProduct } from "../components/forms/createproduct";
import { Modal } from "../components/modal";
import * as Dialog from "@radix-ui/react-dialog";
import { PageWrapper } from "../components/pagewrapper";
import { ProductCard } from "../components/productcard";

export function Stock(){
    return(
        <PageWrapper
            headerTitle="Relojoaria Digital"
            sessionTitle="Stock"
            componentsChildren={
                <div className="w-full h-screen px-6 pb-2 grid md:grid-cols-3 gap-2">
                    <div className="md:col-span-2 rounded-md shadow-sm bg-white border border-gray-100">
                        <div className=" grid grid-cols-[auto_auto_auto] px-5 py-2 bg-gray-100 items-center 
                        justify-between rounded-[6px_6px_0_0]">
                            <h4 className="text-blue-950 font-bold">Nome</h4>
                            <h4 className="text-blue-950 font-bold text-center">Valor</h4>
                        <div className="flex justify-end gap-14">
                            <h4 className="text-blue-950 font-bold">Total</h4>
                            <h4 className="text-blue-950 font-bold">Qtd. Utilizada</h4>
                        </div>
                    </div>
                    {products.map((p) => (
                      <ProductCard
                        id={p}
                        name={p.name}
                        price={p.price}
                        unit={p.unid}
                      />
                    ))}
                  </div>
                  <div className="md:col-span-1 rounded-md shadow-sm bg-white border-gray-100"></div>
                </div>
              }
            >
              <Modal tiltle="Cadastro de Produto" open={isOpen} setOpen={setIsOpen}>
                <CreateProduct
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
                </CreateProduct>
              </Modal>
            </PageWrapper>
    )
}