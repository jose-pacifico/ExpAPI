import { Usuario } from '../../models/Usuario';

export type createUsuarioDto = Pick<
  Usuario,
  'tipoUsuarioId' | 'nome' | 'email' | 'senha'
>;
export type updateUsuarioDto = Pick<
  Usuario,
  'tipoUsuarioId' | 'nome' | 'email' | 'senha'
>;
