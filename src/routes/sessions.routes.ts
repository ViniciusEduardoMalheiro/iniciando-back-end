import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';
const sessionsRouter = Router();


// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

sessionsRouter.post('/', async (request, response) => {

try {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  })

  delete user.password;

  return response.json({ user, token })
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
});

export default sessionsRouter;
