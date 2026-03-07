import { Tooltip, PieChart, ResponsiveContainer,Legend, Pie } from "recharts";

interface ChartProp {
  data: any[];
}
export function Chart({data}: ChartProp) {
    return ( 
        <ResponsiveContainer width="100%" height="100%">
            <PieChart
              style={{outline:'none'}}
              responsive
            >
                <Pie
                  data={data}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  fill="blue"
                  innerRadius="60%"
                  outerRadius="80%"
                  isAnimationActive
                />
                <Tooltip />
                <Legend verticalAlign="top"/>
            </PieChart>
        </ResponsiveContainer>
    )
}