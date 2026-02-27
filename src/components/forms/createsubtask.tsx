import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import type { SubTaskForm, SubTaskRequest } from "../../types/subtask";
import { useState } from "react";
import { Plus } from "lucide-react";

interface CreateSubTaskProps{
    submitForm?: () => SubmitHandler<SubTaskRequest>;
}

export function CreateSubTask({submitForm}: CreateSubTaskProps){
    const {
      control,
      register,
      handleSubmit,
      reset,
      formState: {errors}
    } = useForm<SubTaskForm>({
        defaultValues: {
            subtasks: [
                {title: "", description: "", price: 0}
            ]
        }
    });
    const [erro, setError] = useState();
    const {append, fields, remove,} = useFieldArray({
        control,
        name: "subtasks"
    });

    return (
      <div>
        <form
          onSubmit={handleSubmit(submitForm? submitForm : ()=>null)}
          className="flex flex-col w-full overflow-y-auto gap-4"
        >
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-col border-b border-gray-400 pb-5">
                <span className="text-xs text-red-500">Subtarefa {index + 1}</span>
                <label htmlFor="subTaskTitulo" className="font-semibold text-sm">
                    Título:
                </label>
                <input
                    type="text"
                    id="subTaskTitulo"
                    className="outline-none border border-gray-200 rounded-sm p-2 text-sm"
                    {...register(`subtasks.${index}.title`, {
                    required: "Informe o título",
                    })}
                />
          {errors.subtasks?.[index]?.title && (
            <span className="text-xs text-red-500">{errors.subtasks?.[index]?.title.message}</span>
          )}
          <label htmlFor="subTaskDescription" className="font-semibold text-sm mt-4">
            Descrição:
          </label>
          <input
            type="text"
            id="subTaskDescription"
            className="outline-none border border-gray-200 rounded-sm p-2 text-sm"
            {...register(`subtasks.${index}.description`)}
          />
          {errors.subtasks?.[index]?.description && (
            <span className="text-xs text-red-500">{errors.subtasks?.[index]?.message}</span>
          )}
          <label htmlFor="subTaskValue" className="font-semibold text-sm mt-4">
            Valor da subtarefa:
          </label>
          <input
            type="number"
            id="subTaskValue"
            placeholder="R$ 0.00"
            className="outline-none border border-gray-200 rounded-sm p-2 text-sm"
            {...register(`subtasks.${index}.price`)}
          />
          {errors.subtasks?.[index]?.price && (
            <span className="text-xs text-red-500">{errors.subtasks?.[index]?.price.message}</span>
          )}
            </div>
          ))}
          <button
            type="button"
            className="flex mt-2 justify-center col-span-2 p-1 rounded-sm text-gray-100 bg-blue-900
            hover:scale-95 hover:bg-blue-950 transition-all duration-150"
            onClick={() => append({title: "", description: "", price: 0})}
          >
            <Plus />
          </button>
        </form>
    </div>
  );
}