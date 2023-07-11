import { Produto } from '../../models/Produto';

export type createProdutoDto = Pick<Produto, 'nome' | 'preco' | 'estoque'>;
export type updateProdutoDto = Pick<Produto, 'nome' | 'preco' | 'estoque'>;
