import { useEffect, useState, type ReactNode } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { StockRequest } from "../../types/stock";
import { createStock, updateStock } from "../../services/stockservice";
import { toast } from "sonner";
interface CreatStockInputs {
  productName: string;
  quantity: number;
}

interface CreateStockProps {
  children: ReactNode;
  onLoading: (loading: boolean) => void;
  openModal: () => void;
  onSuccess?: () => Promise<void>;
  loadedStock?: string;
  isUpdate?: boolean;
}
export function CreateStock({ children, onLoading, onSuccess, openModal, isUpdate, loadedStock }: CreateStockProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CreatStockInputs>();
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<CreatStockInputs> = async (data: StockRequest) => {
    try {
      onLoading?.(true);
      if(isUpdate && loadedStock){
         await updateStock(data);
         onSuccess?.();
         toast.success("Estoque atualizado com sucesso.", {id:"stockUpateSuccess"})
      }else {
        await createStock(data);
        onSuccess?.();
        toast.success("Estoque cadastrado com sucesso.", {id:"stockCreateSuccess"})
      }
    }catch (error) {
      setError("erro ao cadastrar estoque",);
      toast.error("Erro ao cadastrar estoque.", {id:"stockCreateError"})
      console.error("erro ao cadastrar estoque", error);
    }finally{
      onLoading?.(false);
      openModal?.();
    }
  };
    
    

    useEffect(() => {
      reset({
        productName: loadedStock
      })
    }, [loadedStock, reset])
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full overflow-y-auto"
      >
        <label htmlFor="productName" className="font-semibold text-sm">
          Nome do produto:
        </label>
        <input
          type="text"
          id="productName"
          className="outline-none border border-gray-200 rounded-sm p-2 text-sm"
          {...register("productName", {
            required: "Informe o nome do produto",
          })}
          placeholder="Informe o nome do produto"
        />
        {errors.productName && (
          <span className="text-xs text-red-500">
            {errors.productName.message}
          </span>
        )}
        <label htmlFor="quantity" className="font-semibold text-sm mt-4">
          Quantidade:
        </label>
        <input
          type="number"
          id="quantity"
          className="outline-none border border-gray-200 rounded-sm p-2 text-sm"
          {...register("quantity", {
            required: "Informe a quantidade",
          })}
          placeholder="Informe a quantidade"
        />
        {errors.quantity && (
          <span className="text-xs text-red-500">
            {errors.quantity.message}
          </span>
        )}
        {error && <span className="text-sm text-red-500">{error}</span>}
        {children}
      </form>
    </div>
  );
}
