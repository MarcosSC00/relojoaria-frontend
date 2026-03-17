import * as Dialog from "@radix-ui/react-dialog";
import { CreateProduct } from "../components/forms/createproduct";
import { Modal } from "../components/modal";
import { PageWrapper } from "../components/pagewrapper";
import { useEffect, useState } from "react";
import { ProductCard } from "../components/productcard";
import { type ProductData, type ProductResponse, } from "../types/product";
import { toast } from "sonner";
import { deleteProduct, getProductData, getProducts } from "../services/productservice";
import { Loading } from "../components/loading";
import { CircularProgress } from "../components/circularprogress";
import { Plus } from "lucide-react";

export function Product() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [isLoading, setIsLoding] = useState(false);
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductResponse[]>([]);
  const [dataProduct, setDataProduct] = useState<ProductData[]>([]);

  const loadProducts = async () => {
    try {
      setIsLoding(true);
      const result = await getProducts();
      const dataChart = await getProductData();
      setProducts(result);
      setFilteredProducts(result);
      setDataProduct(dataChart)
    } catch (error) {
      toast.error("Erro ao carregar produtos.");
      console.error(error);
    }finally{
      setIsLoding(false);
    }
  }

  const handleDeleteProduct = async (name: string) => {
    try{
      await deleteProduct(name);
      toast.success("Produto deletado com sucesso.");
      setProducts((prev) => prev.filter((p => p.name !== name)));
    }catch(error){
      console.error(error);
      toast.error("Erro ao deletar produto.");
    }
  }

  const handleFilter = (name: string) => {
    if(!name) {
      setFilteredProducts(products);
      return;
    }
    const result = products.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
    setFilteredProducts(result);
  }

  useEffect(() => {
   loadProducts(); 
  }, []);
  
  return (
    <PageWrapper
      headerTitle="Relojoaria Digital"
      sessionTitle="Produtos"
      handleFilter={handleFilter}
      componentsChildren={
        products && products.length >=1 ? (
          <div className="w-full max-h-screen px-6 pb-2 grid 
        grid-cols-1 md:grid-cols-3 gap-2">
          <div className="md:col-span-2 rounded-md shadow-sm 
          bg-white border border-gray-100 p-2">
            <div className="overflow-auto">
              <div className="min-w-max grid grid-cols-[40px_100px_100px_80px_60px] 
            md:grid-cols-[40px_1fr_1fr_1fr_1fr] 
            px-5 py-2 items-center bg-gray-200 
            justify-between rounded-[6px_6px_0_0]">
              <h4 className="text-blue-950 font-bold">id</h4>
              <h4 className="text-blue-950 font-bold text-center">Nome</h4>
              <h4 className="text-blue-950 font-bold text-center">Valor</h4>
              <h4 className="text-blue-950 font-bold text-center">Unidade</h4>
              <h4 className="text-blue-950 font-bold text-end">Ações</h4>
            </div>
            {isLoading ? (
              <div className="w-full flex justify-center py-10">
                <Loading/>
              </div>
            ):(
              filteredProducts.map((p) => (
              <ProductCard 
                id={p.id}
                name={p.name}
                price={p.price}
                unit={p.unit}
                onDelete={handleDeleteProduct}
                key={p.id}
                onReaload={loadProducts}
                isSubmiting={isSubmiting}
              />
            ))
            )}
            </div>
          </div>
          <div className="flex flex-col items-center md:col-span-1 rounded-md shadow-sm bg-white border-gray-100">
            <h4 className="text-md font-bold my-2 text-blue-950">Consumo</h4>
            <div className="flex flex-col w-full h-[180px] md:h-full overflow-auto p-4 gap-5">
              {dataProduct && dataProduct.length >=1 ?(
                dataProduct.map((p, index) => (
                  <div className="flex items-center pb-2 justify-between border-b border-gray-200" key={index}>
                    <h6 className="font-bold text-slate-800 capitalize">{p.name}</h6>
                    <CircularProgress 
                      value={Math.round((p.quantity*100)/(p.current_qtd))} 
                      size={32}
                      strokeWidth={4}
                      textSize="md:text-xs"
                    />
                  </div>
                ))
              ):(
                <span className="flex justify-center text-xs text-red-500">Nenhum dado de uso.</span>
              )}
            </div>
          </div>
        </div>
        ):(
          <button 
              className="flex px-5 py-1 font-bold rounded-md bg-[#031D3B] text-gray-200
              justify-self-center hover:scale-95 transition-all duration-100 shadow-md gap-2
              mt-8"
              onClick={() => setIsOpen(true)}
            >
              Criar Produto
              <Plus/>
            </button>
        )
      }
    >
      <Modal tiltle="Cadastro de Produto" open={isOpen} setOpen={setIsOpen}>
        <CreateProduct
          onLoading={setIsSubmiting}
          openModal={() => setIsOpen(false)}
          onSuccess={loadProducts}
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
  );
}
