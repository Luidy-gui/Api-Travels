import { UserRepository } from '../../Interfaces/user.Repository';
import { User } from '../../services/user.service';
import { prisma } from './prismaClient/prisma.client';

export class UserPrismaRepository implements UserRepository {
    async create({ name, email, password, profileImage }: User): Promise<User> {
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password,
                profileImage: profileImage,
            }
        });

        return user;
    }

    async findByEmail(email: string): Promise<boolean> {
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        });

        return !!user;
    }
}