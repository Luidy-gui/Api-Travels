import { User } from '../services/user.service';

export interface UserRepository {
    create(user: User): Promise<User>
    findByEmail(email: string): Promise<boolean>
}