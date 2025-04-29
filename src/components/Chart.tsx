import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Database } from '../types/supabase'

type Transaction = Database['public']['Tables']['transacoes']['Row']

interface ChartProps {
  transactions: Transaction[]
}

export function Chart({ transactions }: ChartProps) {
  // Agrupa transações por data e calcula o total
  const data = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.data).toLocaleDateString()
    const existingDay = acc.find(item => item.date === date)
    
    if (existingDay) {
      existingDay.total += transaction.valor
    } else {
      acc.push({ date, total: transaction.valor })
    }
    
    return acc
  }, [] as { date: string; total: number }[])

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip 
            formatter={(value: number) => 
              `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
            }
          />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
} 