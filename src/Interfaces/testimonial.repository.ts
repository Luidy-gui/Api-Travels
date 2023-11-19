import { Testimonial, TestimonialFindAllReqQuery, UpdatedTestimonial } from '../services/testimonial.service';

export interface TestimonialRepository {
    create(testimonial: Testimonial): Promise<Testimonial>
    findAll({ pageSize, skip }: TestimonialFindAllReqQuery): Promise<Testimonial[]>
    findRandom(): Promise<Testimonial[]>
    findById(id: string): Promise<Testimonial | null>
    update(testimonial: UpdatedTestimonial): Promise<UpdatedTestimonial>
    delete(id: string): Promise<void>
}