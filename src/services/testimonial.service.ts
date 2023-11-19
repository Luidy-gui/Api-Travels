import { TestimonialRepository } from '../Interfaces/testimonial.repository';
import { CustomError } from '../api.error';
import { UserRepository } from '../Interfaces/user.Repository';

export type Testimonial = {
    id?: string;
    testimonial: string;
    user_id: string;
    createdAt?: Date;
    updatedAt?: Date;

}

export type UpdatedTestimonial = {
    id: string;
    testimonial: string;
    user_id?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type TestimonialFindAllReqQuery = {
    pageNumber?: number;
    pageSize?: number;
    skip?: number;
}

export class TestimonialService {
    constructor(private testimonialRepository: TestimonialRepository, private userRepository: UserRepository) { }

    async create({ testimonial, user_id }: Testimonial) {
        const user = await this.userRepository.findById(user_id);

        if (!user) {
            throw new CustomError('User_id is invalid', 400);
        }

        const create = await this.testimonialRepository.create({ testimonial, user_id });

        return create;
    }
    async findRandom() {
        return await this.testimonialRepository.findRandom();
    }
    async findAll({ pageSize, skip }: TestimonialFindAllReqQuery) {
        if (!pageSize) {
            pageSize = 10;
        }

        if (!skip) {
            skip = 0;
        }

        return await this.testimonialRepository.findAll({ pageSize, skip });
    }

    async findById(id: string) {
        const find = await this.testimonialRepository.findById(id);

        if (!find) {
            throw new CustomError('Testimonial not found', 400);
        }

        return find;
    }

    async update({ id, testimonial }: UpdatedTestimonial) {
        await this.findById(id);

        const updatedTestimonial = await this.testimonialRepository.update({ id, testimonial });

        return updatedTestimonial;
    }

    async delete(id: string) {
        try {
            await this.testimonialRepository.delete(id);
            return { message: 'testimonial successfully deleted' };
        } catch (error) {
            throw new CustomError('Failed to delete testimonial', 400);
        }
    }

}

/*
PageNumber = req.query || 1
PageSize = req.query || 1
skip = req.query || 1


if(!PageNumber) {
    PageNumber = 3
}

3 - 1 = 2*10 =20

if(!PageSize) {
    PageNumber = 10
}

if(!skip) {
    skip = (page number - 1) * pageSize

    export type TestimonialFindAllReqQuery = {
        pageNumber?: number;
        pageSize?: number;
        skip?: number;
    }
}











*/