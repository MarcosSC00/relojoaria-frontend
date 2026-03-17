import { Award, DollarSign, Target, Users } from "lucide-react";
import { Card } from "../components/ui/Card";
import { useAuth } from "../hooks/useAuth";
import { Header } from "../components/header";
import { Navigation } from "../components/navigation";
import { Footer } from "../components/footer";
import { coinFormater } from "../utils/coinFormater";
import type { TaskResponse } from "../types/task";
import { useEffect, useState } from "react";
import { type Client } from "../types/client";
import { toast } from "sonner";
import { getClients } from "../services/clientservice";
import { getAllTasks } from "../services/taskservice";
import { Loading } from "../components/loading";

export function Dashboard() {
  const { userAuth } = useAuth();
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [clients, tasks] = await Promise.all([getClients(), getAllTasks()]);
      setClients(clients);
      setTasks(tasks);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao carregar dados",{id:"toastDashboardError"});
    }finally{
      setLoading(false);
    }
  }

  const totalValue = tasks.reduce((acc, cur) => acc + cur.totalPrice,0);
  let completedTaskPercent = 0;
  if(tasks && tasks.length >= 1){
    completedTaskPercent = ((tasks.filter(t => t.status === 'DONE').length)*100)/(tasks.length);
  }else completedTaskPercent = 0;

  const completedTasks = tasks.filter(t => t.status === 'DONE').length;
  const activeTasks = tasks.filter(t => t.status !== 'DONE').length;

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <Header title="Dashboard" username={userAuth?.username} />
      <Navigation />
      {loading ? (
        <Loading />
      ):(
        <div className="px-6 py-8 space-y-8 min-h-screen w-full max-w-[1440px] xl:justify-self-center">
        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[auto_auto_auto_auto] gap-6">
          {/* Total Revenue */}
          <Card className="bg-linear-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm font-medium">
                  Receita Total
                </p>
                <p className="text-3xl font-bold">
                  {coinFormater(totalValue ?? 0)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-300" />
            </div>
          </Card>

          {/* Completion Rate */}
          <Card className="bg-linear-to-r from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-300 text-sm font-medium">
                  Taxa de Conclusão
                </p>
                <p className="text-3xl font-bold">{formatPercentage(completedTaskPercent)}</p>
              </div>
              <Target className="w-8 h-8 text-green-300" />
            </div>
          </Card>

          {/* Total Users */}

          <Card className="bg-linear-to-r from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-400 text-sm font-medium">
                  Total Clientes
                </p>
                <p className="text-3xl font-bold">{clients.length}</p>
              </div>
              <Users className="w-8 h-8 text-purple-300" />
            </div>
          </Card>

          {/* Completed Tasks */}
          <Card className="bg-linear-to-r from-orange-500 to-orange-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-300 text-sm font-medium">
                  Serviços Concluídos
                </p>
                <p className="text-3xl font-bold">{completedTasks}</p>
              </div>
              <Award className="w-8 h-8 text-orange-300" />
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
                  <div className="text-2xl font-bold text-blue-600">{tasks.length}</div>
                  <div className="text-xs text-gray-600">Total</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">{activeTasks}</div>
                  <div className="text-xs text-gray-600">Ativas</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
                  <div className="text-xs text-gray-600">Concluídas</div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Valor Total
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    {coinFormater(totalValue ?? 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Valor Médio</span>
                  <span className="text-sm font-medium text-gray-700">
                    {coinFormater(tasks && tasks.length >= 1 ? (totalValue/tasks.length) : 0 )}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      )}
      <Footer/>
    </div>
  );
}
