import { FastifyInstance } from 'fastify';
import { UserController } from '../controller/user.controller';
import { UserService } from '../services/user.service';
import { UserPrismaRepository } from '../repositories/PrismaRepository/user.repository';

const userRepository = new UserPrismaRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

export async function userRouter(fastify: FastifyInstance) {

    fastify.post('/users', (request, reply) => userController.create(request, reply));
}
