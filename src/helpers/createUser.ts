import { UserRepository } from '../Interfaces/user.Repository';

//is being used to create users in Testimonial.service.spec.ts
export async function createUser(count: number, userRepository: UserRepository) {
    const userIds: string[] = [];
    for (let i = 0; i < count; i++) {
        const user = await userRepository.create({
            name: 'User Test',
            email: 'usertest@gmail.com',
            password: 'user123456789',
            profileImage: 'url://fakeurl'
        });

        if (!user.id) {
            throw new Error('User_id Is Undefined');
        }

        userIds.push(user.id);
    }
    return userIds;
}


