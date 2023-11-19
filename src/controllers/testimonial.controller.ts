import { FastifyReply, FastifyRequest } from 'fastify';
import { Testimonial, TestimonialService, UpdatedTestimonial } from '../services/testimonial.service';

export class TestimonialController {
    constructor(private testimonialService: TestimonialService) { }

    create = async (request: FastifyRequest, reply: FastifyReply) => {
        const { user_id } = request.params as Testimonial;
        const { testimonial } = request.body as Testimonial;

        const testimonialCreated = await this.testimonialService.create({ testimonial, user_id });

        return reply.code(201).send(testimonialCreated);
    };


    findAll = async (request: FastifyRequest, reply: FastifyReply) => {
        const { pageSize, skip } = request.query as { pageSize: number, skip: number };

        const testimonials = await this.testimonialService.findAll({ pageSize: Number(pageSize), skip: Number(skip) });

        return reply.code(200).send(testimonials);
    };

    findRandom = async (request: FastifyRequest, reply: FastifyReply) => {
        const testimonials = await this.testimonialService.findRandom();

        return reply.code(200).send(testimonials);
    };

    update = async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as UpdatedTestimonial;
        const { testimonial } = request.body as UpdatedTestimonial;

        const updatedTestimonial = await this.testimonialService.update({ id, testimonial });

        return reply.code(200).send(updatedTestimonial);

    };

    delete = async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: string };
        const testimonial = await this.testimonialService.delete(id);

        reply.code(200).send(testimonial);
    };
}