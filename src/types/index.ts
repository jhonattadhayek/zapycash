import { Database } from './supabase'

type TransacaoSupabase = Database['public']['Tables']['transacoes']['Row']
type UsuarioSupabase = Database['public']['Tables']['usuarios']['Row']
type CategoriaSupabase = Database['public']['Tables']['categoria_trasacoes']['Row']

export interface Transaction {
  id: string
  data: string
  descricao: string
  valor: number
  tipo: 'receita' | 'despesa'
  usuario_id: string
  categoria_id?: string
  pagador?: string
  recebedor?: string
  mes?: string
  categoria?: {
    id: string
    descricao: string
  }
}

export interface CategoryTotal {
  category: string
  total: number
  percentage?: number
  color?: string
}

export interface MonthlyData {
  month: string
  receitas: number
  despesas: number
}

export interface FilterState {
  month: string
  year: string
  category: string
}

export interface Usuario {
  id: string
  email: string
  nome: string
  created_at?: string
}

export interface Categoria {
  id: string
  descricao: string
  usuario_id?: string
  created_at?: string
}

export interface MetaFinanceira {
  id: string
  descricao: string
  valor_meta: number
  status: 'pendente' | 'concluida'
}

export interface ResumoFinanceiro {
  totalReceitas: number
  totalDespesas: number
  saldoTotal: number
}

export interface Summary {
  totalReceitas: number
  totalDespesas: number
  saldo: number
  transacoesPorCategoria: {
    [categoria: string]: {
      total: number
      quantidade: number
    }
  }
}

export interface DashboardData {
  usuario: Usuario | null
  transactions: Transaction[]
  categories: Categoria[]
  metas: MetaFinanceira[]
  resumoFinanceiro: ResumoFinanceiro
  summary: Summary
  isLoading: boolean
  error: string | null
}

export type TransactionType = 'receita' | 'despesa'

export type SummaryData = {
  income: number
  expenses: number
  balance: number
}

// Type helpers para conversão de tipos do Supabase
export const mapSupabaseTransaction = (t: TransacaoSupabase): Transaction => ({
  id: String(t.id),
  data: t.data,
  descricao: t.descricao,
  valor: Number(t.valor),
  tipo: t.tipo.toLowerCase().includes('entrada') || t.tipo.toLowerCase().includes('receita') 
    ? 'receita' 
    : 'despesa',
  usuario_id: String(t.usuario_id),
  categoria_id: t.categoria_id ? String(t.categoria_id) : undefined,
  pagador: t.pagador,
  recebedor: t.recebedor,
  mes: t.mes
})

export const mapSupabaseUser = (u: UsuarioSupabase): Usuario => ({
  id: String(u.id),
  email: u.email,
  nome: u.nome || '',
  created_at: u.created_at
})

export const mapSupabaseCategoria = (c: CategoriaSupabase): Categoria => ({
  id: String(c.id),
  descricao: c.descricao,
  usuario_id: c.usuario_id ? String(c.usuario_id) : undefined,
  created_at: c.created_at
})