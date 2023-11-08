import { FastifyInstance } from 'fastify';
import { UserController } from '../controller/user.controller';
import { UserService } from '../services/user.service';
import { UserPrismaRepository } from '../repositories/PrismaRepository/user.repository';


export async function userRouter(fastify: FastifyInstance) {
    const userRepository = new UserPrismaRepository();
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);


    fastify.route({
        method: 'POST',
        url: '/users',
        handler: userController.create.bind(userController)
    });
}
