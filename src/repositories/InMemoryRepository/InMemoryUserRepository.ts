import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcrypt';
import { UserRepository } from '../../Interfaces/user.Repository';
import { User } from '../../services/user.service';

export class InMemoryUserRepository implements UserRepository {
    private usersRepository: User[] = [];

    async create({ name, email, password, profileImage }: User): Promise<User> {
        const id = uuidv4();
        const passwordHash = await hash(password, 10);
        const user = { id: id, name, email, password: passwordHash, profileImage };
        this.usersRepository.push(user);

        return user;
    }

    async findByEmail(email: string): Promise<boolean> {
        const user = this.usersRepository.find((user) => user.email === email);

        return !!user;
    }
}