import { useState, type ReactNode } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
interface CreatStockInputs {
  productName: string;
  quantity: number;
}

interface CreateStockProps {
  children: ReactNode;
}
export function CreateStock({ children }: CreateStockProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatStockInputs>();
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<CreatStockInputs> = (data) => {
    try {
      console.log(data);
    } catch (error) {
      setError("erro ao cadastrar estoque");
      console.error("erro ao cadastrar estoque", error);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full overflow-y-auto"
      >
        <label htmlFor="productname" className="font-semibold text-sm">
          Nome do produto:
        </label>
        <input
          type="text"
          id="prductname"
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
        <label htmlFor="quantidade" className="font-semibold text-sm mt-4">
          Quantidade:
        </label>
        <input
          type="number"
          id="quantidade"
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
