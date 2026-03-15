import { Modal } from "../components/modal";
import * as Dialog from "@radix-ui/react-dialog";
import { PageWrapper } from "../components/pagewrapper";
import { StockProduct } from "../components/stockproduct";
import { CircularProgress } from "../components/circularprogress";
import { CreateStock } from "../components/forms/createstock";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useParams } from "react-router";
import { getCustomTasks } from "../services/taskservice";
import { getProductAnalysis } from "../services/productservice";
import { type TaskCustom } from "../types/task";
import { coinFormater } from "../utils/coinFormater";
import { type ProductAnalysis } from "../types/product-analysis";
import { Loading } from "../components/loading";

export function Stock(){
  const [tasks, setTasks] = useState<TaskCustom[]>([]);
  const [productAnalysis, setProductsAnalysis] = useState<ProductAnalysis>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {productName} = useParams<{productName: string}>();

  const loadStock = async (productName: string) =>{
    try {
      setIsLoading(true);
      const customTask = await getCustomTasks(productName);
      const productAnalysis = await getProductAnalysis(productName);
      setTasks(customTask);
      setProductsAnalysis(productAnalysis);
    } catch (error: any) {
        console.error(error);
        toast.error("Erro ao carregar estoque", {
          id: "load-stock-error"
        });
      }finally{
        setIsLoading(false);
      }
  }

  useEffect(() => {
    if(productName)
      loadStock(productName);
  }, []);

  return(
    <PageWrapper
      headerTitle="Relojoaria Digital"
      sessionTitle="Stock"
      componentsChildren={
        <div className="w-full px-6 pb-2 grid md:grid-cols-2 gap-2">
          <div className="bg-white rounded-md shadow-md border border-gray-200">
            {isLoading ? (
              <div className="w-full h-full flex justify-center">
                <Loading/>
              </div>
            ):(
              productAnalysis ? (
              <StockProduct
                onSuccess={() => loadStock(productName ?? '')}
                tasks={tasks}
                productId={productAnalysis.productId}
                productName={productAnalysis.productName}
                productUnit={productAnalysis.productUnity}
                productPrice={productAnalysis.productPrice}
                qtdCurrent={productAnalysis.currentProductQtd}
              />
            ) : (
              <div className="flex h-full justify-center items-center">
                <h4 className="flex text-sm font-semibold">
                  {`Produto não possui estoque.`}
                </h4>
              </div>
            )
            )}
          </div>
          <div className="flex flex-col bg-white rounded-md shadow-md border border-gray-200
          py-4 px-8 items-start gap-5">
            <h4 className="text-md font-semibold">Detalhes de  uso</h4>
            {isLoading ? (
              <div className="w-full h-full flex justify-center">
                <Loading/>
              </div>
            ):(
              <div className="flex flex-col items-center md:flex-row md:items-center gap-5 w-full">
              <CircularProgress value={
                productAnalysis ? (
                  Math.round((productAnalysis.totalProductUsed*100)/(productAnalysis.currentProductQtd))
                ) : 0
              }
                textSize="text-3xl"
              />
              <div className="flex flex-col rounded-md bg-gray-500/10 px-5 py-2 w-full justify-center
              gap-2">
                <div className="flex flex-col">
                  <h4 className="font-bold text-xs mb-1">Total utilizado: 
                    <span  className="text-xs lowercase font-medium">{`(${productAnalysis?.productUnity})`}</span>
                  </h4>
                  <span className="text-sm p-1 rounded-sm bg-blue-300/60 pl-2 font-semibold w-full">{
                    productAnalysis ? (
                      productAnalysis.totalProductUsed
                    ) : 0
                  }</span>
                </div>
                <div className="flex flex-col">
                  <h4 className="font-bold text-xs">Serviços:</h4>
                  <span className="text-sm p-1 rounded-sm bg-blue-300/60 pl-2 font-semibold w-full">{
                    tasks ? (
                      tasks.length
                    ) : 0
                  }</span>
                </div>
                <div className="flex flex-col">
                  <h4 className="font-bold text-xs">Valor em serviços:</h4>
                  <span className="text-sm p-1 rounded-sm bg-blue-300/60 pl-2 font-semibold w-full">{
                    productAnalysis ? (
                      coinFormater(productAnalysis.totalPrice)
                    ) : 0
                  }</span>
                </div>
              </div>
            </div>
            )}
          </div>
        </div>}
    >
      <Modal tiltle="Cadastro de estoque" open={isOpen} setOpen={setIsOpen}>
        <CreateStock
          onLoading={setIsSubmiting}
          openModal={() => setIsOpen(false)}
          onSuccess={() => loadStock(productName ?? '')}
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
        </CreateStock>
      </Modal>
    </PageWrapper>
  )
}