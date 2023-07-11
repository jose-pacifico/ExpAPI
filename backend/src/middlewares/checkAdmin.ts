import { Request, Response, NextFunction } from 'express';
import { TipoUsuarios } from '../resources/tipoUsuario/tipoUsuario.constants';

const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.tipoUsuarioId === TipoUsuarios.ADMIN) next();
  else res.status(401).json({ msg: 'Você não tem permissão' });
};

export default checkAdmin;
