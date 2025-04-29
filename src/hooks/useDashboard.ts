import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Database } from '../types/supabase'
import { 
  Transaction, 
  Usuario,
  Categoria,
  ResumoFinanceiro,
  DashboardData as IDashboardData,
  Summary,
  mapSupabaseTransaction,
  mapSupabaseUser,
  mapSupabaseCategoria
} from '../types'

type UsuarioRow = Database['public']['Tables']['usuarios']['Row']
type TransacaoRow = Database['public']['Tables']['transacoes']['Row']
type CategoriaRow = Database['public']['Tables']['categoria_trasacoes']['Row']

interface DashboardData extends Omit<IDashboardData, 'usuario' | 'metas'> {
  user: Usuario | null
}

const initialData: DashboardData = {
  user: null,
  transactions: [],
  categories: [],
  summary: {
    totalReceitas: 0,
    totalDespesas: 0,
    saldo: 0,
    transacoesPorCategoria: {}
  },
  resumoFinanceiro: {
    totalReceitas: 0,
    totalDespesas: 0,
    saldoTotal: 0
  },
  isLoading: true,
  error: null
}

export function useDashboard(email: string): DashboardData {
  console.log('useDashboard iniciado com email:', email)
  
  const [data, setData] = useState<DashboardData>(initialData)

  const fetchUsuario = async (email: string): Promise<Usuario | null> => {
    console.log('Buscando usuário com email:', email)
    
    const { data: usuario, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .single()

    if (error) {
      console.error('Erro ao buscar usuário:', error)
      return null
    }

    if (!usuario) {
      console.log('Usuário não encontrado')
      return null
    }

    console.log('Usuário encontrado:', usuario)
    return mapSupabaseUser(usuario)
  }

  const fetchTransactions = async (usuarioId: string): Promise<Transaction[]> => {
    console.log('Buscando transações para usuário:', usuarioId)
    
    const { data: transacoes, error } = await supabase
      .from('transacoes')
      .select('*')
      .eq('usuario_id', usuarioId)
      .order('data', { ascending: false })

    if (error) {
      console.error('Erro ao buscar transações:', error)
      return []
    }

    if (!transacoes || transacoes.length === 0) {
      console.log('Nenhuma transação encontrada para o usuário')
      return []
    }

    const categoriaIds = [...new Set(transacoes.map(t => t.categoria_id).filter(Boolean))]
    let categoriasMap = new Map<number, Categoria>()
    
    if (categoriaIds.length > 0) {
      const { data: categorias, error: categoriasError } = await supabase
        .from('categoria_trasacoes')
        .select('*')
        .in('id', categoriaIds)

      if (categoriasError) {
        console.error('Erro ao buscar categorias:', categoriasError)
      } else if (categorias) {
        categoriasMap = new Map(
          categorias.map(cat => [cat.id, mapSupabaseCategoria(cat)])
        )
      }
    }

    return transacoes.map(t => {
      const transaction = mapSupabaseTransaction(t)
      if (t.categoria_id) {
        const categoria = categoriasMap.get(t.categoria_id)
        if (categoria) {
          transaction.categoria = {
            id: categoria.id,
            descricao: categoria.descricao
          }
        }
      }
      return transaction
    })
  }

  const fetchCategories = async (userId: string): Promise<Categoria[]> => {
    const { data: categories, error } = await supabase
      .from('categoria_trasacoes')
      .select('*')
      .eq('usuario_id', userId)

    if (error) {
      console.error('Erro ao buscar categorias:', error)
      return []
    }

    return (categories || []).map(mapSupabaseCategoria)
  }

  const calculateSummary = (transactions: Transaction[]): Summary => {
    const summary: Summary = {
      totalReceitas: 0,
      totalDespesas: 0,
      saldo: 0,
      transacoesPorCategoria: {}
    }

    transactions.forEach(transaction => {
      const valor = Number(transaction.valor) || 0
      
      if (transaction.tipo === 'receita') {
        summary.totalReceitas += valor
      } else {
        summary.totalDespesas += valor
      }

      if (transaction.categoria?.descricao) {
        const categoria = transaction.categoria.descricao
        if (!summary.transacoesPorCategoria[categoria]) {
          summary.transacoesPorCategoria[categoria] = {
            total: 0,
            quantidade: 0
          }
        }
        summary.transacoesPorCategoria[categoria].total += valor
        summary.transacoesPorCategoria[categoria].quantidade++
      }
    })

    summary.saldo = summary.totalReceitas - summary.totalDespesas
    return summary
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!email) {
        setData(prev => ({ ...prev, error: 'Email não fornecido', isLoading: false }))
        return
      }

      try {
        const usuario = await fetchUsuario(email)
        if (!usuario) {
          setData(prev => ({ ...prev, error: 'Usuário não encontrado', isLoading: false }))
          return
        }

        const [transactions, categories] = await Promise.all([
          fetchTransactions(usuario.id),
          fetchCategories(usuario.id)
        ])

        const summary = calculateSummary(transactions)
        const resumoFinanceiro: ResumoFinanceiro = {
          totalReceitas: summary.totalReceitas,
          totalDespesas: summary.totalDespesas,
          saldoTotal: summary.saldo
        }

        setData({
          user: usuario,
          transactions,
          categories,
          summary,
          resumoFinanceiro,
          isLoading: false,
          error: null
        })
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
        setData(prev => ({
          ...prev,
          error: 'Erro ao carregar dados do dashboard',
          isLoading: false
        }))
      }
    }

    fetchData()
  }, [email])

  return data
} 