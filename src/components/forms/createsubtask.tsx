import { useFieldArray, type Control, type UseFormRegister, type FieldErrors } from "react-hook-form";
import { Minus, Plus } from "lucide-react";
import type { TaskRequest } from "../../types/task";
import { coinMask } from "../../utils/masksFormater";

interface CreateSubTaskProps{
    control: Control<TaskRequest>,
    register: UseFormRegister<TaskRequest>
    errors: FieldErrors<TaskRequest>
}

export function CreateSubTask({control, register, errors}: CreateSubTaskProps){
    
    const {append, fields, remove,} = useFieldArray({
        control,
        name: "subServices"
    });

    return (
      <div>
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-col border-b border-gray-400 pb-5">
                <div className="flex gap-5 items-center mt-5">
                  <span className="text-xs text-red-500">Subtarefa {index + 1}</span>
                  <button
                    type="button"
                    className="p-1 rounded-sm bg-red-500 text-gray-100
                    disabled:bg-gray-500"
                    disabled={fields.length <= 1}
                    onClick={() => remove(index)}
                  >
                    <Minus size={10}/>
                  </button>
                </div>
                <label htmlFor="subTaskTitulo" className="font-semibold text-sm">
                    Título:
                </label>
                <input
                    type="text"
                    id="subTaskTitulo"
                    className="outline-none border border-gray-200 rounded-sm p-2 text-sm"
                    {...register(`subServices.${index}.title`, {
                    required: "Informe o título",
                    })}
                />
                {errors.subServices?.[index]?.title && (
                  <span className="text-xs text-red-500">{errors.subServices?.[index]?.title.message}</span>
                )}
                <label htmlFor="subTaskDescription" className="font-semibold text-sm mt-4">
                  Descrição:
                </label>
                <input
                  type="text"
                  id="subTaskDescription"
                  className="outline-none border border-gray-200 rounded-sm p-2 text-sm"
                  {...register(`subServices.${index}.description`)}
                />
                {errors.subServices?.[index]?.description && (
                  <span className="text-xs text-red-500">{errors.subServices?.[index]?.message}</span>
                )}
                <label htmlFor="subTaskValue" className="font-semibold text-sm mt-4">
                  Valor da subtarefa:
                </label>
                <input
                  type="text"
                  id="subTaskValue"
                  placeholder="R$ 0.00"
                  className="outline-none border border-gray-200 rounded-sm p-2 text-sm"
                  {...register(`subServices.${index}.price`, 
                    {
                      required:"informe o valor",
                      onChange: (e) => {
                        e.target.value = coinMask(e.target.value);
                      }
                    })}
                />
                {errors.subServices?.[index]?.price && (
                  <span className="text-xs text-red-500">{errors.subServices?.[index]?.price.message}</span>
                )}
            </div>
            
          ))}
          <button
            type="button"
            className="flex w-full mt-2 justify-center col-span-2 p-1 rounded-sm text-gray-100 bg-blue-900
            hover:scale-95 hover:bg-blue-950 transition-all duration-150"
            onClick={() => append({title: "", description: "", price: null})}
          >
            <Plus />
          </button>
    </div>
  );
}