import { type ReactNode } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type Product } from "../../types/product";
import { createProduct } from "../../services/productservice";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface CreateProductProps {
  children: ReactNode;
  onLoading?: (loading: boolean) => void;
  openModal?: () => void;
  onSuccess?: () => Promise<void>;
}
export function CreateProduct({
  children,
  openModal,
  onLoading,
  onSuccess
}: CreateProductProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>();
  const onSubmit: SubmitHandler<Product> = async (data) => {
    try {
      onLoading?.(true);
      await createProduct(data.name, data.unit, data.price);
      toast.success("Produto criado com sucesso!");
      openModal?.();
      onSuccess?.();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
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
          className="outline-none border border-gray-200 rounded-sm text-sm
          text-gray-700"
        >
          <option value="GRAMA">GRAMA</option>
          <option value="UNIDADE">UNIDADE</option>
          <option value="CENTIMETROS">CENTIMETROS</option>
        </select>
        {errors.unit && (
          <span className="text-xs text-red-500">{errors.unit.message}</span>
        )}
        <label htmlFor="price" className="font-semibold text-sm mt-5">
          Preço (por unidade de medida):
        </label>
        <input
          type="number"
          id="price"
          className="outline-none border border-gray-200 rounded-sm p-2 text-sm"
          {...register("price", { required: "Informe o preço" })}
          placeholder="Informe o preço do produto"
        />
        {children}
      </form>
    </div>
  );
}
