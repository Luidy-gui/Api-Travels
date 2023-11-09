import { UserRepository } from '../Interfaces/user.Repository';
import * as bcrypt from 'bcrypt';
import { CustomError } from '../api.error';

export type User = {
    id?: string;
    name: string;
    email: string;
    password: string;
    profileImage: string;
}

export class UserService {
    constructor(private usersRepository: UserRepository) { }

    async create({ name, email, password, profileImage }: User) {
        const userAlredyExists = await this.findByEmail(email);

        if (userAlredyExists) {
            throw new CustomError('User Alredy Exists', 409);
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = this.usersRepository.create({ name, email, password: passwordHash, profileImage });

        return user;
    }

    findByEmail(email: string) {
        return this.usersRepository.findByEmail(email);
    }
}