import { useEffect, useState, type ReactNode } from "react";
import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import type { TaskRequest, TaskResponse } from "../../types/task";
import { createTask, updateTask } from "../../services/taskservice";
import { toast } from "sonner";
import { AlertCircle, CheckCircle, Minus, Plus } from "lucide-react";
import { getJustNameProducts } from "../../services/productservice";
import { getAllClientNames } from "../../services/clientservice";
import { CreateSubTask } from "./createsubtask";

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
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskRequest>({
    defaultValues:{
      status: "TODO", 
      items: [
        {productName: "", quantityUsed: null}
      ]}
  });
  const {fields, append, remove} = useFieldArray({
    control,
    name: "items"
  });
  const [errorService, setErrorService] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [productNames, setProductNames] = useState<any[]>([]);
  const [clientnames, setClientNames] = useState<any[]>([]);
  const [isUsed, setIsUsed] = useState<boolean>(true);
  const [haveSubTask, setHaveSubTask] = useState<boolean>(false);

  const loadFiels = async() => {
    try{
      setLoading(true);
      const [clientField, productField] = await Promise.all([
        getAllClientNames(),
        getJustNameProducts()
      ]);
      setClientNames(clientField);
      setProductNames(productField);
    }catch(error){
      console.error(error);
    }finally{
      setLoading(false);
    }
  }

  const handleAlterMaterialUsage = () => {
    setIsUsed((prev) => !prev);
  }

  const handleAlterAddSubTask = () => {
    setHaveSubTask((prev) => !prev);
  }

  useEffect(() => {
    loadFiels();
  }, [])

  useEffect(() => {
    if (loadedTask && clientnames.length > 0) {
      if(loadedTask.subServices.length >= 1){setHaveSubTask(true)}
      console.log(loadedTask)
      reset({
        clientName: loadedTask.clientName,
        title: loadedTask.title,
        type: loadedTask.type,
        description: loadedTask.description,
        addValue: loadedTask.addValue,
        endDate: loadedTask.endDate
        ? loadedTask.endDate.split("T")[0]
        : "",
        items: loadedTask.items?.length
          ? loadedTask.items
          : [{ productName: "", quantityUsed: null }],
        subServices: loadedTask.subServices?.length
          ? loadedTask.subServices : []
      });
    }
  }, [loadedTask, clientnames, reset]);

  const onSubmit: SubmitHandler<TaskRequest> = async (data: TaskRequest) => {
    if (data.subServices?.length) {
    const validSubServices = data.subServices.filter(
      s => s.title || s.description || s.price
    );

    data.subServices = validSubServices.length ? validSubServices : null;
  }
    try {
      onLoading?.(true);
      if(!isUpdate){
        const result = await createTask(data);
        toast(
          <div className="flex gap-2 items-center">
            <CheckCircle className="h-5 w-5 text-[#031D3B]" />
            <div className="flex flex-col">
              <span className="font-medium">Serviço cadastrado!</span>
              <span className="text-xs text-gray-500">
                Título: {result.title}
              </span>
            </div>
          </div>
        , {id: "create-task"});
        openModal?.();
        onSuccess?.();
      }else if(isUpdate && loadedTask){
        const result = await updateTask(loadedTask.id, data);
        toast(
          <div className="flex gap-2 items-center">
            <CheckCircle className="h-5 w-5 text-[#031D3B]" />
            <div className="flex flex-col">
              <span className="font-medium">Serviço atualizado!</span>
              <span className="text-xs text-gray-500">
                Título: {result.title}
              </span>
            </div>
          </div>
        , {id: "update-task", icon:<AlertCircle/>});
        openModal?.();
        onSuccess?.();
      }
      
    } catch (error) {
      setErrorService("Erro ao cadastrar serviço.")
      toast.error("erro ao cadastrar tarefa");
      console.error("erro ao cadastrar tarefa", error);
    } finally{
      onLoading?.(false);
      openModal?.();
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full overflow-y-auto"
      >
        <label htmlFor="client" className="font-semibold text-sm">
          Cliente:
        </label>
        <select
          id="client"
          {...register("clientName", {required: "Informe o cliente"})}
          className="outline-none border border-gray-200 rounded-sm text-gray-600 p-1 text-sm"
        >
          <option value="">Selecione um cliente</option>
          {loading ? (
            <></>
            ) : 
            (
              clientnames?.map((c, index) => (
                <option value={c} key={index}>{c}</option>
              ))
            )}
          </select>
        {errors.clientName && (
          <span className="text-xs text-red-500">{errors.clientName.message}</span>
        )}
        <label htmlFor="title" className="font-semibold text-sm mt-4">
          Title:
        </label>
        <input
          id="title"
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
        
        <div className={`grid grid-cols-2 ${isUsed ? 'grid-rows-[auto_auto_auto_auto]': ''} 
        mt-4 gap-4`}>
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
          {isUsed ? (
            <div>
            <label htmlFor="addvalue" className="font-semibold text-sm">
              Valor adicional:
            </label>
            <input
              type="number"
              id="addvalue"
              placeholder="R$ 0.00"
              className="outline-none w-full border border-gray-200 rounded-sm p-1 text-sm"
              {...register("addValue", {
                setValueAs: (value) =>
                  value ? value : null,
              })}
            />
          </div>
          ) : (
            <div>
            <label htmlFor="servicevalue" className="font-semibold text-sm">
              Valor do serviço:
            </label>
            <input
              type="number"
              id="servicevalue"
              placeholder="R$ 0.00"
              className="w-full outline-none border border-gray-200 rounded-sm p-1 text-sm"
              {...register("addValue", {
                setValueAs: (value) =>
                  value ? value : null,
                required: "Informe o valor"
              })}
            />
          </div>
          )}
          <div className="flex items-center col-span-2 gap-4">
            <label htmlFor="materialuse" className="font-semibold text-sm">Adicionar uso de materiais</label>
            <input 
              id="materialuse"
              type="checkbox" 
              className="accent-blue-600 w-4 h-4" 
              checked={isUsed}
              onChange={handleAlterMaterialUsage}
            />
          </div>
          {isUsed && (
            fields.map((field, index) => (
              <div key={field.id} className="flex flex-col items-center md:gap-4
              md:flex-row col-span-2 gap-2">
                <div className="flex flex-col w-full">
                  <label htmlFor={`product${index}`} className="font-semibold text-sm">
                    Produto usado:
                  </label>
                  <select
                    id={`product${index}`}
                    {...register(`items.${index}.productName`)}
                    className="outline-none border border-gray-200 rounded-sm text-gray-600 p-1 text-sm"
                  >
                    <option value="">Selecione um produto</option>
                    {loading ? (
                      <></>
                    ) : (
                      productNames?.map((p, index) => (
                        <option value={p} key={index}>{p}</option>
                      ))
                    )}
                  </select>
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor={`quantity${index}`} className="font-semibold text-sm">
                    Quantidade usada:
                  </label>
                  <input
                    type="number"
                    id={`quantity${index}`}
                    placeholder="0.00"
                    className="outline-none border border-gray-200 rounded-sm p-1 text-sm"
                    {...register(`items.${index}.quantityUsed`, {valueAsNumber: true})}
                  />
                </div>
                <button
                  type="button"
                  className="p-1 rounded-sm bg-red-500 text-gray-100 
                  mt-2 md:mt-[15px]
                  disabled:bg-gray-500"
                  disabled={fields.length <= 1}
                  onClick={() => remove(index)}
                >
                  <Minus size={12}/>
                </button>
              </div>
          ))
          )}
          {isUsed && (
            <button
              type="button"
              className="flex justify-center col-span-2 p-1 rounded-sm text-gray-100 bg-blue-900
              hover:scale-95 hover:bg-blue-950 transition-all duration-150"
              onClick={() => append({productName: "", quantityUsed: null})}
            >
              <Plus />
            </button>
          )}
        </div>
        <div className="flex gap-4 items-center my-5">
          <span className="font-semibold text-sm">Adicionar subserviço</span>
          <label htmlFor="addSubTask" className="relative inline-flex items-center cursor-pointer">
            <input 
              id="addSubTask" 
              className="sr-only peer"
              checked={haveSubTask}
              type="checkbox"
              onChange={handleAlterAddSubTask}
            />
            <div className="peer bg-gray-400 rounded-full outline-none duration-150 after:duration-150
              w-8 h-4  shadow-inner peer-checked:bg-blue-500 
              peer-focus:outline-none
              after:content-[''] after:rounded-full 
              after:absolute after:outline-none after:h-2.5 after:w-2.5 
              after:bg-gray-50 after:left-0 after:translate-x-1/2
              after:top-1/2 after:-translate-y-1/2 after:flex 
              after:justify-center after:items-center 
              peer-checked:after:translate-x-4.5">
            </div>
          </label>
        </div>
        {haveSubTask && (
          <CreateSubTask 
            control={control}
            errors={errors}
            register={register}
          />
        )}
        <div className="flex flex-col w-fit mt-4">
            <label htmlFor="date" className="font-semibold text-sm">
              Data para entrega:
            </label>
            <input
              type="date"
              id="date"
              placeholder="dd/mm/aa"
              className="outline-none border border-gray-200 rounded-sm p-1 text-sm"
              {...register("endDate", {
                  setValueAs: (value) =>
                  value ? `${value}T00:00:00` : null,
              })}
            />
          </div>
        {errorService && (
          <span className="text-sm text-red-500">{errorService}</span>
        )}
        {children}
      </form>
    </div>
  );
}
