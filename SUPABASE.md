# Documentação Supabase - Dashboard ZapyCash

## Estrutura do Banco de Dados

### Tabelas Principais

1. **usuarios**
   - Armazena informações básicas dos usuários
   - Campos:
     - id: number
     - created_at: string
     - email: string
     - nome: string

2. **transacoes**
   - Registra as transações financeiras
   - Campos:
     - id: number
     - created_at: string
     - descricao: string
     - valor: number
     - tipo: 'receita' | 'despesa'
     - categoria_id: number
     - usuario_id: number

3. **categoria_trasacoes**
   - Categorias para classificação das transações
   - Campos:
     - id: number
     - created_at: string
     - descricao: string
     - usuario_id: number

4. **metas_financeiras**
   - Gerenciamento de metas financeiras
   - Campos:
     - id: number
     - titulo: string
     - descricao: string
     - valor_meta: number
     - valor_atual: number
     - data_inicio: string
     - data_fim: string
     - tipo: string
     - status: string
     - recorrente: boolean
     - notificacoes_ativas: boolean
     - categoria_id: number
     - usuario_id: number

### Tabelas de Suporte

5. **consentimentos_usuarios** (LGPD)
   - Campos:
     - id: number
     - usuario_id: number
     - tipo_consentimento: string
     - status: boolean
     - data_consentimento: string
     - versao_politica: string
     - ip_origem: string

6. **logs_acesso** (Segurança)
   - Campos:
     - id: number
     - usuario_id: number
     - tipo_evento: string
     - data_hora: string
     - ip_origem: string
     - dispositivo: string
     - status: string
     - detalhes: Json

7. **notificacoes_metas**
   - Campos:
     - id: number
     - usuario_id: number
     - meta_id: number
     - tipo: string
     - mensagem: string
     - data_envio: string
     - status_envio: string
     - canal_envio: string
     - lida: boolean
     - data_leitura: string

8. **solicitacoes_lgpd**
   - Campos:
     - id: number
     - usuario_id: number
     - tipo_solicitacao: string
     - status: string
     - data_solicitacao: string
     - data_conclusao: string
     - justificativa: string

## Configuração do Supabase

### Arquivo de Configuração Principal

O projeto utiliza o arquivo `src/lib/supabase.ts` para configuração do cliente Supabase:

```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
    storageKey: 'supabase.auth.token',
    flowType: 'pkce'
  }
});
```

### Variáveis de Ambiente Necessárias

O projeto requer as seguintes variáveis de ambiente:
- `VITE_SUPABASE_URL`: URL do projeto Supabase
- `VITE_SUPABASE_ANON_KEY`: Chave anônima para autenticação

## Como Utilizar o Banco de Dados

### 1. Tipagem

O projeto utiliza TypeScript com tipos gerados automaticamente do Supabase. Os tipos estão definidos em `src/types/supabase.ts`.

Exemplo de uso:
```typescript
import { Database } from '../types/supabase';
type Usuario = Database['public']['Tables']['usuarios']['Row'];
type Transacao = Database['public']['Tables']['transacoes']['Row'];
```

### 2. Serviços

Exemplo de implementação de um serviço:

```typescript
export const DashboardService = {
  async getUsuarioByEmail(email: string): Promise<{ usuario: Usuario | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('email', email)
        .single();
      
      if (error) {
        console.error('Erro ao buscar usuário:', error);
        return { usuario: null, error: 'Usuário não encontrado' };
      }
      
      return { usuario: data, error: null };
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      return { usuario: null, error: 'Erro ao buscar usuário' };
    }
  }
}
```

## Boas Práticas

### Segurança
1. Sempre utilize o sistema de logs para registrar acessos importantes
2. Mantenha os consentimentos LGPD atualizados
3. Nunca exponha chaves de acesso no código
4. Utilize as políticas de segurança do Supabase para controle de acesso

### Performance
1. Utilize índices apropriados nas consultas frequentes
2. Implemente paginação em listagens grandes
3. Considere implementar cache para dados frequentemente acessados
4. Monitore o tempo de resposta das queries

### Desenvolvimento
1. Sempre utilize tipos fortemente tipados
2. Mantenha a documentação atualizada
3. Implemente tratamento de erros adequado
4. Siga os padrões de nomenclatura existentes

## Próximos Passos Recomendados

1. **Caching**
   - Implementar sistema de cache para dados frequentemente acessados
   - Utilizar React Query ou SWR para gerenciamento de estado do servidor

2. **Error Handling**
   - Criar sistema centralizado de tratamento de erros
   - Implementar logging estruturado

3. **Rate Limiting**
   - Implementar limitação de requisições por usuário
   - Monitorar uso da API

4. **Migrations**
   - Criar sistema robusto de migrations
   - Documentar todas as alterações no banco

5. **Monitoramento**
   - Implementar métricas de performance
   - Monitorar queries lentas
   - Criar dashboards de monitoramento

## Como Implementar Novas Features

1. **Definir Tipos**
   - Adicionar novos tipos em `types/supabase.ts`
   - Manter a tipagem forte

2. **Criar Serviço**
   - Criar arquivo de serviço específico para a feature
   - Seguir o padrão de organização existente

3. **Implementar Lógica**
   - Utilizar o cliente Supabase de `lib/supabase.ts`
   - Implementar tratamento de erros
   - Seguir boas práticas de performance

4. **Testar**
   - Criar testes unitários
   - Testar edge cases
   - Verificar performance

5. **Documentar**
   - Atualizar este documento conforme necessário
   - Documentar novas APIs e endpoints
   - Manter exemplos de uso atualizados 