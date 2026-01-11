import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

interface CreateServiceInputs {
  client: string;
  title: string;
  description: string;
  type: string;
  materialUsage: {
    prodname: string;
    quantity: number;
  };
  addValue: number;
}

export function CreateService() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateServiceInputs>();
  const [errorService, setErrorService] = useState<string | null>(null);

  const onSubmit: SubmitHandler<CreateServiceInputs> = (data) => {
    try {
      console.log(data);
    } catch (error) {
      setErrorService("erro ao cadastrar cliente");
      console.error("erro ao cadastrar cliente", error);
    }
  };
  return (
    <div
      className="w-[400px] h-fit bg-white p-4 
            shadow-md rounded-md mx-auto relative"
    >
      <h2
        className="text-xl font-bold text-center px-2 text-gray-50 bg-[#031D3B]
          rounded-md w-fit mb-5"
      >
        Ordem de serviço
      </h2>
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
          {...register("client", { required: "Informe o cliente." })}
          placeholder="Informe o cliente"
        />
        {errors.client && (
          <span className="text-xs text-red-500">{errors.client.message}</span>
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
          <span className="text-xs text-red-500">{errors.client?.message}</span>
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
        {errorService && (
          <span className="text-sm text-red-500">{errorService}</span>
        )}
        <div className="grid grid-cols-2 grid-rows-2 mt-4 gap-4">
          <fieldset>
            <legend className="font-semibold text-sm">Tipo:</legend>
            <div className="flex gap-2">
              <input
                type="radio"
                id="repair"
                value="reparo"
                {...register("type")}
              />
              <label htmlFor="repair">Reparo</label>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                id="sale"
                value="venda"
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
              {...register("materialUsage.prodname")}
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
              {...register("materialUsage.quantity")}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <button
            className="p-1 border border-gray-300 rounded-md text-[#031D3B] font-semibold
               hover:bg-gray-200 transition-colors duration-150
               hover:cursor-pointer text-sm"
          >
            CANCELAR
          </button>
          <button
            type="submit"
            className="p-1 bg-[#031D3B] border border-[#031D3B] rounded-md text-gray-50 font-semibold
               hover:bg-[#020F1F] transition-colors duration-150
               hover:cursor-pointer text-sm"
          >
            SALVAR
          </button>
        </div>
      </form>
    </div>
  );
}
