export interface Contato {
    contato_id: number;
    contato_nome: string;
    contato_email: string;
    contato_celular: string;
    contato_telefone: string;
    contato_sn_favorito: 'S' | 'N';
    contato_sn_ativo: 'S' | 'N';
    contato_dh_cad: string;
  }