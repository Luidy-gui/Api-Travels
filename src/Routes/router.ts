import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { UserPrismaRepository } from '../repositories/PrismaRepository/user.repository';
import { TestimonialPrismaRepository } from '../repositories/PrismaRepository/testimonial.repository';
import { TestimonialService } from '../services/testimonial.service';
import { TestimonialController } from '../controllers/testimonial.controller';


const userRepository = new UserPrismaRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);
export async function userRouter(fastify: FastifyInstance) {

    fastify.post('/users', userController.create);
}

export async function testimonialRoutes(fastify: FastifyInstance) {
    const testimonialRepository = new TestimonialPrismaRepository();
    const testimonialService = new TestimonialService(testimonialRepository, userRepository);
    const testimonialController = new TestimonialController(testimonialService);

    fastify.post('/testimonials/:user_id', testimonialController.create);
    fastify.get('/testimonials', testimonialController.findAll);
    fastify.patch('/testimonial/:id', testimonialController.update);
    fastify.delete('/testimonial/:id', testimonialController.delete);
    fastify.get('/testimonials-home', testimonialController.findRandom);

}
