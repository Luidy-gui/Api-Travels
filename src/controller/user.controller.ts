import { FastifyReply, FastifyRequest } from 'fastify';
import { User, UserService } from '../services/user.service';

export class UserController {
    constructor(private userService: UserService) { }
    async create(request: FastifyRequest, reply: FastifyReply) {
        const { name, email, password, profileImage } = await request.body as User;

        const user = await this.userService.create({ name, email, password, profileImage });

        return reply.code(201).send(user);
    }
}
