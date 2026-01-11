import { Award, DollarSign, Target, Users } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Outlet } from "react-router";
import { useAuth } from "../hooks/UseAuth";
import { Header } from "../components/header";
import { Navigation } from "../components/navigation";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const formatPercentage = (value: number) => {
  return `${value.toFixed(1)}%`;
};
export function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <Header title="Dashboard" username={user?.username} />
      <Navigation />
      <div className="px-6 py-8 space-y-8">
        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Revenue */}
          <Card className="bg-linear-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">
                  Receita Total
                </p>
                <p className="text-3xl font-bold">
                  {formatCurrency(999999.99)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-200" />
            </div>
          </Card>

          {/* Completion Rate */}
          <Card className="bg-linear-to-r from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">
                  Taxa de Conclusão
                </p>
                <p className="text-3xl font-bold">{formatPercentage(99.0)}</p>
              </div>
              <Target className="w-8 h-8 text-green-200" />
            </div>
          </Card>

          {/* Total Users */}

          <Card className="bg-linear-to-r from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">
                  Total Usuários
                </p>
                <p className="text-3xl font-bold">{999}</p>
              </div>
              <Users className="w-8 h-8 text-purple-200" />
            </div>
          </Card>

          {/* Completed Tasks */}
          <Card className="bg-linear-to-r from-orange-500 to-orange-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">
                  Serviços Concluídos
                </p>
                <p className="text-3xl font-bold">{99}</p>
              </div>
              <Award className="w-8 h-8 text-orange-200" />
            </div>
          </Card>
        </div>

        {/* Module Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Tasks Module */}
          <Card title="Tarefas" className="hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{99}</div>
                  <div className="text-xs text-gray-600">Total</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">{99}</div>
                  <div className="text-xs text-gray-600">Ativas</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{99}</div>
                  <div className="text-xs text-gray-600">Concluídas</div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Valor Total
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    {formatCurrency(99999.99)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Valor Médio</span>
                  <span className="text-sm font-medium text-gray-700">
                    {formatCurrency(99999.99)}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
