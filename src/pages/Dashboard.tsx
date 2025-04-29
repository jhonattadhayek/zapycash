import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { CategoryTotal, Transaction, FilterState, MonthlyData } from '../types';
import { useDashboard } from '../hooks/useDashboard'
import { Card } from '../components/Card'
import { TransactionList } from '../components/TransactionList'
import { MonthlyChart } from '../components/MonthlyChart'
import { FilterBar } from '../components/FilterBar'
import { Loading } from '../components/Loading'
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import PieChart from '../components/PieChart';
import { ErrorMessage } from '../components/ErrorMessage';

const Error = ({ message, retry }: { message: string; retry?: () => void }) => (
  <div className="flex flex-col items-center justify-center min-h-screen gap-4">
    <div className="text-red-500 text-xl text-center">{message}</div>
    {retry && (
      <button 
        onClick={retry}
        className="px-4 py-2 bg-[#00FF94] text-black rounded-lg hover:bg-[#00E676] transition-colors"
      >
        Tentar novamente
      </button>
    )}
  </div>
)

const Dashboard: React.FC = () => {
  console.log('Dashboard - Componente iniciado')
  
  const { user } = useAuth();
  const navigate = useNavigate();
  
  console.log('Dashboard - Estado inicial:', { 
    userEmail: user?.email,
    isAuthenticated: !!user 
  })
  
  // Se não houver usuário autenticado, redireciona para o login
  useEffect(() => {
    console.log('Dashboard - useEffect de autenticação:', {
      user,
      email: user?.email
    })
    
    if (!user) {
      console.log('Dashboard - Usuário não autenticado, redirecionando para login')
      navigate('/login');
    } else {
      console.log('Dashboard - Usuário autenticado:', {
        email: user.email,
        id: user.id
      })
    }
  }, [user, navigate]);

  const { 
    usuario, 
    transactions, 
    categories, 
    resumoFinanceiro,
    isLoading, 
    error 
  } = useDashboard(user?.email || '')

  console.log('Estado do dashboard:', {
    usuarioEmail: user?.email,
    usuario,
    transactionsCount: transactions.length,
    categoriesCount: categories.length,
    resumoFinanceiro,
    isLoading,
    error
  })
  
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
  const [categoryTotals, setCategoryTotals] = useState<CategoryTotal[]>([])
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([])
  const [filters, setFilters] = useState<FilterState>({
    month: '',
    year: '',
    category: ''
  })

  // Estados para os dados dos filtros
  const [months, setMonths] = useState<{ value: string; label: string }[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [summary, setSummary] = useState({ income: 0, expenses: 0, balance: 0 });

  useEffect(() => {
    if (!transactions) return

    console.log('Aplicando filtros às transações:', {
      filters,
      totalTransactions: transactions.length
    })

    let filtered = [...transactions]

    if (filters.month) {
      filtered = filtered.filter(t => {
        const transactionMonth = new Date(t.data).getMonth() + 1
        return transactionMonth.toString() === filters.month
      })
    }

    if (filters.year) {
      filtered = filtered.filter(t => {
        const transactionYear = new Date(t.data).getFullYear()
        return transactionYear.toString() === filters.year
      })
    }

    if (filters.category) {
      filtered = filtered.filter(t => t.categoria?.descricao === filters.category)
    }

    console.log('Transações filtradas:', {
      totalFiltradas: filtered.length,
      primeiraTransacao: filtered[0]
    })

    setFilteredTransactions(filtered)
  }, [transactions, filters])

  useEffect(() => {
    if (!filteredTransactions || !categories) return

    console.log('Calculando totais por categoria:', {
      totalTransacoes: filteredTransactions.length,
      totalCategorias: categories.length
    })

    const totals = categories.map(cat => {
      const transactionsInCategory = filteredTransactions.filter(
        t => t.categoria?.descricao === cat.descricao
      )
      const total = transactionsInCategory.reduce((sum, t) => sum + t.valor, 0)

      return {
        category: cat.descricao,
        total,
        color: '#' + Math.floor(Math.random()*16777215).toString(16)
      }
    })

    const totalAmount = totals.reduce((sum, cat) => sum + cat.total, 0)
    
    const totalsWithPercentage = totals.map(cat => ({
      ...cat,
      percentage: totalAmount > 0 ? (cat.total / totalAmount) * 100 : 0
    }))

    console.log('Totais por categoria calculados:', totalsWithPercentage)

    setCategoryTotals(totalsWithPercentage)
  }, [filteredTransactions, categories])

  useEffect(() => {
    if (!filteredTransactions) return

    console.log('Calculando dados mensais:', {
      totalTransacoes: filteredTransactions.length
    })

    const monthlyTotals = filteredTransactions.reduce((acc: Record<string, MonthlyData>, transaction) => {
      const date = new Date(transaction.data)
      const monthKey = date.toLocaleString('pt-BR', { month: 'long' })

      if (!acc[monthKey]) {
        acc[monthKey] = {
          month: monthKey,
          receitas: 0,
          despesas: 0
        }
      }

      if (transaction.tipo === 'receita') {
        acc[monthKey].receitas += transaction.valor
      } else {
        acc[monthKey].despesas += transaction.valor
      }

      return acc
    }, {})

    const monthlyDataArray = Object.values(monthlyTotals)
    console.log('Dados mensais calculados:', monthlyDataArray)

    setMonthlyData(monthlyDataArray)
  }, [filteredTransactions])

  if (!user) {
    console.log('Renderização cancelada: usuário não autenticado')
    return null; // Evita renderização desnecessária enquanto redireciona
  }
  
  if (isLoading) {
    console.log('Renderizando loading')
    return <Loading />
  }
  
  if (error) {
    console.log('Renderizando erro:', error)
    return <ErrorMessage message={error} />
  }

  // Calcula a tendência baseada nas últimas transações
  const calculateTrend = (transactions: Transaction[], tipo: 'receita' | 'despesa') => {
    if (!transactions || transactions.length < 2) return 'neutral';

    const lastTwoMonths = transactions
      .filter(t => t.tipo === tipo)
      .slice(0, 2)
      .map(t => t.valor)
      .reverse();

    if (lastTwoMonths.length < 2) return 'neutral';
    return lastTwoMonths[1] > lastTwoMonths[0] ? 'up' : 'down';
  };

  const receitasTrend = calculateTrend(transactions, 'receita');
  const despesasTrend = calculateTrend(transactions, 'despesa');
  const saldoTrend = resumoFinanceiro.saldoTotal > 0 ? 'up' : resumoFinanceiro.saldoTotal < 0 ? 'down' : 'neutral';

  console.log('Renderizando dashboard com dados:', {
    receitasTrend,
    despesasTrend,
    saldoTrend,
    resumoFinanceiro
  })

  return (
    <div className="min-h-screen pl-16 md:pl-20 bg-[#121212] text-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-6">
        <Header />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card 
            title="Receitas" 
            value={resumoFinanceiro.totalReceitas}
            trend={receitasTrend}
          />
          <Card 
            title="Despesas" 
            value={resumoFinanceiro.totalDespesas}
            trend={despesasTrend}
          />
          <Card 
            title="Saldo" 
            value={resumoFinanceiro.saldoTotal}
            trend={saldoTrend}
          />
        </div>

        <FilterBar
          availableCategories={categories?.map(c => c.descricao) || []}
          filters={filters}
          onFilterChange={setFilters}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#1E1E1E] p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Gastos por Categoria</h3>
            <PieChart data={categoryTotals} />
          </div>
          <div className="bg-[#1E1E1E] p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Evolução Mensal</h3>
            <MonthlyChart data={monthlyData} />
          </div>
        </div>

        <div className="bg-[#1E1E1E] p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Últimas Transações</h3>
          <TransactionList transactions={filteredTransactions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;