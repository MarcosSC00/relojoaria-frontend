import { CheckCircle } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface CreateClientInupts {
  name: string;
  phone: string;
}
interface CreateClientProps {
  children: ReactNode;
  loadedClient?: {
    name: string;
    phone: string;
  };
  onLoading?: (loading: boolean) => void;
  openModal?: () => void;
}

export function CreateClient({
  children,
  loadedClient,
  onLoading,
  openModal,
}: CreateClientProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateClientInupts>({
    defaultValues: {
      name: loadedClient?.name,
      phone: loadedClient?.phone,
    },
  });
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<CreateClientInupts> = async (data) => {
    try {
      onLoading?.(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
      toast(
        <div className="flex gap-2 items-center">
          <CheckCircle className="h-5 w-5 text-[#031D3B]" />
          <div className="flex flex-col">
            <span className="font-medium">Cliente cadastrado!</span>
            <span className="text-xs text-gray-500">
              Nome: Marcos Silva Chaves
            </span>
          </div>
        </div>
      );
      openModal?.();
    } catch (errorSubmit) {
      setError("erro ao cadastrar cliente");
      toast.error("Erro ao cadastrar o cliente.");
      console.error("erro ao cadastrar cliente", errorSubmit);
    } finally {
      onLoading?.(false);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full overflow-y-auto"
      >
        <label htmlFor="name" className="font-semibold text-sm">
          Nome:
        </label>
        <input
          type="text"
          id="name"
          className="outline-none border border-gray-200 rounded-sm p-2 text-sm"
          {...register("name", {
            required: "Informe o nome",
          })}
        />
        {errors.name && (
          <span className="text-xs text-red-500">{errors.name.message}</span>
        )}
        <label htmlFor="phone" className="font-semibold text-sm mt-4">
          Telefone:
        </label>
        <input
          type="text"
          id="phone"
          className="outline-none border border-gray-200 rounded-sm p-2 text-sm"
          {...register("phone", {
            required: "Informe o telefone/celular",
            pattern: {
              value: /^\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}-[0-9]{4}$/,
              message: "Telefone inválido",
            },
          })}
        />
        {errors.phone && (
          <span className="text-xs text-red-500">{errors.phone.message}</span>
        )}
        {error && <span className="text-sm text-red-500">{error}</span>}
        {children}
      </form>
    </div>
  );
}
