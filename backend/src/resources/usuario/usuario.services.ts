import { Usuario } from '../../models/Usuario';
import { createUsuarioDto, updateUsuarioDto } from './usuario.types';

export const getAllUsuarios = async (): Promise<Usuario[]> => {
  const usuarios = await Usuario.findAll();
  return usuarios.map((p) => p.toJSON());
};

export const createUsuario = async (
  usuario: createUsuarioDto,
): Promise<Usuario> => {
  return await Usuario.create(usuario);
};

export const getUsuario = async (id: string): Promise<Usuario | null> => {
  return await Usuario.findOne({ where: { id } });
};

export const updateUsuario = async (id: string, usuario: updateUsuarioDto) => {
  const prod = await getUsuario(id);
  if (prod === null) return null;
  const [affectedCount] = await Usuario.update(usuario, { where: { id } });
  return affectedCount;
};
