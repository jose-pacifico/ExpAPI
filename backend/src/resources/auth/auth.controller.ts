import { Request, Response } from 'express';
import { createUsuario } from '../usuario/usuario.services';
import { Usuario } from '../../models/Usuario';
import { createUsuarioDto } from '../usuario/usuario.types';
import { TipoUsuarios } from '../tipoUsuario/tipoUsuario.constants';
import { checkCredentials, checkIsAdmin } from './auth.services';
import bcrypt from 'bcryptjs';

const signup = async (req: Request, res: Response) => {
  const { nome, email, senha } = req.body;
  try {
    const usuario = await buscaUsuarioPorEmail(email);
    if (usuario)
      return res.status(400).json({ msg: 'já existe usuário com este e-mail' });
    const rounds = parseInt(process.env.BCRYPT_ROUNDS!, 10);
    bcrypt.genSalt(rounds, (err, salt) => {
      bcrypt.hash(senha, salt, async (err, hash) => {
        await createUsuario({
          nome,
          email,
          senha: hash,
          tipoUsuarioId: TipoUsuarios.CLIENTE,
        });
      });
    });

    res.status(201).json();
  } catch (e) {
    return res.status(500).json();
  }
};

const login = async (req: Request, res: Response) => {
  const { email, senha } = req.body;
  try {
    const usuario = await checkCredentials({ email, senha });
    if (!usuario)
      return res.status(401).json({ msg: 'Email e/ou Senha incorretos' });
    req.session.uid = usuario.id;
    req.session.tipoUsuarioId = usuario.tipoUsuarioId;
    res.status(200).json({
      isAdmin: await checkIsAdmin(usuario.id),
      msg: 'Usuário Logado!',
    });
  } catch (e) {
    res.status(200).json(e);
  }
};

const logout = (req: Request, res: Response) => {
  if (req.session.uid) {
    req.session.destroy((err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ msg: 'O logout foi feito com sucesso!' });
    });
  } else {
    res.status(400).json({ msg: 'O usuário não está logado' });
  }
};

export default { signup, login, logout };

export const buscaUsuarioPorEmail = async (
  email: string,
): Promise<createUsuarioDto | null> => {
  return await Usuario.findOne({
    attributes: ['id', 'tipoUsuarioId', 'nome', 'email'],
    where: { email },
  });
};
