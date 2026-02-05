import { useState, type ReactNode } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { TaskRequest, TaskResponse } from "../../types/task";
import { createTask } from "../../services/taskservice";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";

interface CreateServiceProps {
  children: ReactNode;
  loadedTask?: TaskResponse
  onLoading?: (loading: boolean) => void;
  openModal?: () => void;
  onSuccess?: ()=> Promise<void>,
  isUpdate?: boolean
}

export function CreateTask({
  children,
  isUpdate,
  loadedTask,
  onLoading,
  onSuccess,
  openModal
}: CreateServiceProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskRequest>({
    defaultValues:{status: "TODO"}
  });
  const [errorService, setErrorService] = useState<string | null>(null);

  const onSubmit: SubmitHandler<TaskRequest> = async (data: TaskRequest) => {
    try {
      onLoading?.(true);
      const result = await createTask(data);
      toast(
        <div className="flex gap-2 items-center">
          <CheckCircle className="h-5 w-5 text-[#031D3B]" />
          <div className="flex flex-col">
            <span className="font-medium">Cliente cadastrado!</span>
            <span className="text-xs text-gray-500">
              Título: {result.title}
            </span>
          </div>
        </div>
      );
      openModal?.();
      onSuccess?.();
    } catch (error) {
      toast.error("erro ao cadastrar tarefa");
      console.error("erro ao cadastrar tarefa", error);
    } finally{
      onLoading?.(false);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full overflow-y-auto"
      >
        <label htmlFor="cliente" className="font-semibold text-sm">
          Cliente:
        </label>
        <input
          type="text"
          id="cliente"
          className="outline-none border border-gray-200 rounded-sm p-2 text-sm"
          {...register("clientId", { required: "Informe o cliente." })}
          placeholder="Informe o cliente"
        />
        {errors.clientId && (
          <span className="text-xs text-red-500">{errors.clientId.message}</span>
        )}
        <label htmlFor="title" className="font-semibold text-sm mt-4">
          Title:
        </label>
        <input
          type="text"
          placeholder="Titulo"
          className="outline-none border border-gray-200 rounded-sm p-2 text-sm"
          {...register("title", { required: "Informe um título" })}
        />
        {errors.title && (
          <span className="text-xs text-red-500">{errors.title?.message}</span>
        )}
        <label htmlFor="description" className="font-semibold text-sm mt-4">
          Descrição:
        </label>
        <input
          type="text"
          id="description"
          className="outline-none border border-gray-200 rounded-sm p-2 text-sm"
          {...register("description")}
        />
        {errors.description && (
          <span className="text-xs text-red-500">
            {errors.description.message}
          </span>
        )}
        
        <div className="grid grid-cols-2 grid-rows-2 mt-4 gap-4">
          <fieldset>
            <legend className="font-semibold text-sm">Tipo:</legend>
            <div className="flex gap-2">
              <input
                type="radio"
                id="repair"
                value="REPAIR"
                {...register("type")}
              />
              <label htmlFor="repair">Reparo</label>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                id="sale"
                value="SALE"
                {...register("type")}
              />
              <label htmlFor="sale">Venda</label>
            </div>
          </fieldset>
          <div>
            <label htmlFor="addvalue" className="font-semibold text-sm">
              Valor adicional:
            </label>
            <input
              type="number"
              id="addvalue"
              placeholder="R$ 0.00"
              className="outline-none border border-gray-200 rounded-sm p-1 text-sm"
              {...register("addValue")}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="product" className="font-semibold text-sm">
              Produto usado:
            </label>
            <select
              id="product"
              {...register("items.name")}
              className="outline-none border border-gray-200 rounded-sm text-gray-600 p-1 text-sm"
            >
              <option value="ouro">Ouro</option>
              <option value="prata">Prata</option>
              <option value="cobre">Cobre</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="quantity" className="font-semibold text-sm">
              Quantidade usada:
            </label>
            <input
              type="number"
              id="quantity"
              placeholder="0.00"
              className="outline-none border border-gray-200 rounded-sm p-1 text-sm"
              {...register("items.quantity")}
            />
          </div>
        </div>
        {errorService && (
          <span className="text-sm text-red-500">{errorService}</span>
        )}
        {children}
      </form>
    </div>
  );
}
