import { useEffect, useState, type ReactNode } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type ProductRequest } from "../../types/product";
import { createProduct, updateProduct } from "../../services/productservice";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { coinMask } from "../../utils/masksFormater";

interface CreateProductProps {
  children: ReactNode;
  onLoading?: (loading: boolean) => void;
  openModal?: () => void;
  onSuccess?: () => Promise<void>;
  isUpdate?: boolean;
  loadedProduct?: ProductRequest;
}
export function CreateProduct({
  children,
  openModal,
  onLoading,
  onSuccess,
  isUpdate,
  loadedProduct
}: CreateProductProps) {
  const [error ,setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductRequest>();

  useEffect(() => {
      reset({
        name: loadedProduct?.name,
        price: loadedProduct?.price,
        unit: loadedProduct?.unit
      })
    }, [loadedProduct, reset])

  const onSubmit: SubmitHandler<ProductRequest> = async (data) => {
    try {
      onLoading?.(true);
      if(isUpdate && loadedProduct){
        await updateProduct(loadedProduct.name, data);
        openModal?.();
        onSuccess?.();
      }else{
        await createProduct(data);
        toast.success("Produto criado com sucesso!");
        openModal?.();
        onSuccess?.();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        setError("Erro ao cadastrar produto.");
        console.error("Erro ao cadastrar produto", error.response?.data);
      }
    } finally {
      reset();
      onLoading?.(false);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full overflow-y-auto"
      >
        <label htmlFor="nameprod" className="font-semibold text-sm">
          Nome do produto:
        </label>
        <input
          type="text"
          id="nameprod"
          className="outline-none border border-gray-200 rounded-sm p-2 text-sm lowercase"
          {...register("name", { required: "Informe o nome do produto" })}
          placeholder="Ex.: Ouro"
        />
        {errors.name && (
          <span className="text-xs text-red-500">{errors.name.message}</span>
        )}
        <label htmlFor="unid" className="font-semibold text-sm mt-4">
          Unidade de medida:
        </label>
        <select
          id="unid"
          {...register("unit")}
          className="outline-none border border-gray-200 rounded-sm 
          text-sm text-gray-700"
        >
          <option value="GRAMA" className="text-xs md:text-md">GRAMA</option>
          <option value="UNIDADE" className="text-xs md:text-md">UNIDADE</option>
          <option value="CENTIMETROS" className="text-xs md:text-md">CENTIMETROS</option>
        </select>
        {errors.unit && (
          <span className="text-xs text-red-500">{errors.unit.message}</span>
        )}
        <label htmlFor="price" className="font-semibold text-sm mt-5">
          Preço (por unidade de medida):
        </label>
        <input
          type="text"
          id="price"
          className="outline-none border border-gray-200 rounded-sm p-2 text-sm"
          {...register("price", 
            { required: "Informe o preço",
              onChange: (e) => {
                e.target.value = coinMask(e.target.value);
              }
            }
          )}
          placeholder="Informe o preço do produto"
        />
        {children}
        {error && (
          <span className="text-xs text-red-500">{error}</span>
        )}
      </form>
    </div>
  );
}
