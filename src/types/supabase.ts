export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      usuarios: {
        Row: {
          id: number
          created_at: string
          email: string
          nome: string
        }
      }
      transacoes: {
        Row: {
          id: number
          created_at: string
          descricao: string
          valor: number
          tipo: 'receita' | 'despesa'
          categoria_id: number
          usuario_id: number
        }
      }
      categoria_trasacoes: {
        Row: {
          id: number
          created_at: string
          descricao: string
          usuario_id: number
        }
      }
      consentimentos_usuarios: {
        Row: {
          data_consentimento: string | null
          id: number
          ip_origem: string | null
          status: boolean | null
          tipo_consentimento: string
          usuario_id: number
          versao_politica: string
        }
        Insert: {
          data_consentimento?: string | null
          id?: number
          ip_origem?: string | null
          status?: boolean | null
          tipo_consentimento: string
          usuario_id: number
          versao_politica: string
        }
        Update: {
          data_consentimento?: string | null
          id?: number
          ip_origem?: string | null
          status?: boolean | null
          tipo_consentimento?: string
          usuario_id?: number
          versao_politica?: string
        }
        Relationships: [
          {
            foreignKeyName: "consentimentos_usuarios_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          }
        ]
      }
      documents: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      logs_acesso: {
        Row: {
          data_hora: string | null
          detalhes: Json | null
          dispositivo: string | null
          id: number
          ip_origem: string | null
          status: string | null
          tipo_evento: string
          usuario_id: number | null
        }
        Insert: {
          data_hora?: string | null
          detalhes?: Json | null
          dispositivo?: string | null
          id?: number
          ip_origem?: string | null
          status?: string | null
          tipo_evento: string
          usuario_id?: number | null
        }
        Update: {
          data_hora?: string | null
          detalhes?: Json | null
          dispositivo?: string | null
          id?: number
          ip_origem?: string | null
          status?: string | null
          tipo_evento?: string
          usuario_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "logs_acesso_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          }
        ]
      }
      metas_financeiras: {
        Row: {
          categoria_id: number | null
          created_at: string
          data_fim: string
          data_inicio: string
          descricao: string | null
          id: number
          intervalo_recorrencia: string | null
          notificacoes_ativas: boolean
          recorrente: boolean
          status: string
          tipo: string
          titulo: string
          ultima_atualizacao: string
          usuario_id: number
          valor_atual: number
          valor_meta: number
        }
        Insert: {
          categoria_id?: number | null
          created_at?: string
          data_fim: string
          data_inicio: string
          descricao?: string | null
          id?: number
          intervalo_recorrencia?: string | null
          notificacoes_ativas?: boolean
          recorrente?: boolean
          status?: string
          tipo: string
          titulo: string
          ultima_atualizacao?: string
          usuario_id: number
          valor_atual?: number
          valor_meta: number
        }
        Update: {
          categoria_id?: number | null
          created_at?: string
          data_fim?: string
          data_inicio?: string
          descricao?: string | null
          id?: number
          intervalo_recorrencia?: string | null
          notificacoes_ativas?: boolean
          recorrente?: boolean
          status?: string
          tipo?: string
          titulo?: string
          ultima_atualizacao?: string
          usuario_id?: number
          valor_atual?: number
          valor_meta?: number
        }
        Relationships: [
          {
            foreignKeyName: "metas_financeiras_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categoria_trasacoes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "metas_financeiras_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          }
        ]
      }
      notificacoes_metas: {
        Row: {
          canal_envio: string
          created_at: string
          dados_adicionais: Json | null
          data_envio: string
          data_leitura: string | null
          id: number
          lida: boolean
          mensagem: string
          meta_id: number
          status_envio: string
          tentativas_envio: number
          tipo: string
          ultima_tentativa: string | null
          usuario_id: number
        }
        Insert: {
          canal_envio: string
          created_at?: string
          dados_adicionais?: Json | null
          data_envio?: string
          data_leitura?: string | null
          id?: number
          lida?: boolean
          mensagem: string
          meta_id: number
          status_envio: string
          tentativas_envio?: number
          tipo: string
          ultima_tentativa?: string | null
          usuario_id: number
        }
        Update: {
          canal_envio?: string
          created_at?: string
          dados_adicionais?: Json | null
          data_envio?: string
          data_leitura?: string | null
          id?: number
          lida?: boolean
          mensagem?: string
          meta_id?: number
          status_envio?: string
          tentativas_envio?: number
          tipo?: string
          ultima_tentativa?: string | null
          usuario_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "notificacoes_metas_meta_id_fkey"
            columns: ["meta_id"]
            isOneToOne: false
            referencedRelation: "metas_financeiras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notificacoes_metas_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          }
        ]
      }
      solicitacoes_lgpd: {
        Row: {
          data_conclusao: string | null
          data_solicitacao: string | null
          id: number
          justificativa: string | null
          status: string
          tipo_solicitacao: string
          usuario_id: number
        }
        Insert: {
          data_conclusao?: string | null
          data_solicitacao?: string | null
          id?: number
          justificativa?: string | null
          status?: string
          tipo_solicitacao: string
          usuario_id: number
        }
        Update: {
          data_conclusao?: string | null
          data_solicitacao?: string | null
          id?: number
          justificativa?: string | null
          status?: string
          tipo_solicitacao?: string
          usuario_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "solicitacoes_lgpd_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: unknown
      }
      match_documents: {
        Args: { query_embedding: string; match_count?: number; filter?: Json }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const 