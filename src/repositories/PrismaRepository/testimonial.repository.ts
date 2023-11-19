import { Prisma } from '@prisma/client';
import { TestimonialRepository } from '../../Interfaces/testimonial.repository';
import { Testimonial, TestimonialFindAllReqQuery, UpdatedTestimonial } from '../../services/testimonial.service';
import { prisma } from './prismaClient/prisma.client';
import { sqltag } from '@prisma/client/runtime/library';

export class TestimonialPrismaRepository implements TestimonialRepository {
    async create({ testimonial, user_id }: Testimonial): Promise<Testimonial> {
        return await prisma.testimonial.create({
            data: {
                testimonial: testimonial,
                user_id: user_id,
            }
        });
    }
    async findAll({ pageSize, skip }: TestimonialFindAllReqQuery): Promise<Testimonial[]> {
        return await prisma.testimonial.findMany({ skip: skip, take: pageSize });
    }

    async findRandom(): Promise<Testimonial[]> {
        const testimonials = await prisma.$queryRaw(sqltag`
        SELECT t.*, u.name, u.profileImage 
        FROM testimonials AS t 
        JOIN users AS u 
        ON t.user_id = u.id 
        ORDER BY RAND() 
        LIMIT 3
    `);
        return testimonials as Promise<Testimonial[]>;
    }

    async findById(id: string): Promise<Testimonial | null> {
        return await prisma.testimonial.findFirst({ where: { id: id } }) || null;

    }

    async update({ id, testimonial }: UpdatedTestimonial): Promise<UpdatedTestimonial> {
        try {
            return await prisma.testimonial.update({ where: { id: id }, data: { testimonial: testimonial } });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new Error('Testimonial not found');
            }
            throw error;
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await prisma.testimonial.delete({ where: { id: id } });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new Error('Testimonial not found');
            }
            throw error;
        }
    }
}
