import { Request, Response } from 'express';
import { listTipoUsuario } from './tipoUsuario.services';

const index = async (req: Request, res: Response) => {
  try {
    const tipos = await listTipoUsuario();
    res.status(200).json(tipos);
  } catch (e) {
    res.status(500).json(e);
  }
};

export default { index };
