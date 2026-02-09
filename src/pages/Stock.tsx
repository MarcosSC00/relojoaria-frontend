import { CreateProduct } from "../components/forms/createproduct";
import { Modal } from "../components/modal";
import * as Dialog from "@radix-ui/react-dialog";
import { PageWrapper } from "../components/pagewrapper";
import { ProductCard } from "../components/productcard";
import { Divide } from "lucide-react";
import { StockProduct } from "../components/stockproduct";
import { CircularProgress } from "../components/circularprogress";

export function Stock(){
    return(
        <PageWrapper
            headerTitle="Relojoaria Digital"
            sessionTitle="Stock"
            componentsChildren={
              <div className="w-full px-6 pb-2 grid md:grid-cols-2 gap-2">
                <div className="bg-white rounded-md shadow-md border border-gray-200">
                  <StockProduct/>
                </div>
                <div className="flex flex-col bg-white rounded-md shadow-md border border-gray-200
                py-4 px-8 items-start gap-5">
                  <h4 className="text-md font-semibold">Detalhes de  uso</h4>
                  <div className="flex flex-col items-start md:flex md:flex-row md:items-center gap-5 w-full">
                    <CircularProgress value={69}/>
                    <div className="flex flex-col rounded-md bg-gray-500/10 px-5 py-2 w-full justify-center
                    gap-2">
                      <div className="flex flex-col">
                        <h4 className="font-bold text-xs">Total utilizado:</h4>
                        <span className="text-sm p-1 rounded-sm bg-blue-300/60 pl-2 font-semibold w-full">5.400 gramas</span>
                      </div>
                      <div className="flex flex-col">
                        <h4 className="font-bold text-xs">Serviços:</h4>
                        <span className="text-sm p-1 rounded-sm bg-blue-300/60 pl-2 font-semibold w-full">4</span>
                      </div>
                      <div className="flex flex-col">
                        <h4 className="font-bold text-xs">Valor em serviços:</h4>
                        <span className="text-sm p-1 rounded-sm bg-blue-300/60 pl-2 font-semibold w-full">R$ 5.404</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
            >
              <></>
            </PageWrapper>
    )
}