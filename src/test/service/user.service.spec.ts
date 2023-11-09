import { beforeEach, describe, expect, test } from 'vitest';
import { InMemoryUserRepository } from '../../repositories/InMemoryRepository/InMemoryUserRepository';
import { UserService } from '../../services/user.service';

describe('User Service', () => {
    let usersRepository;
    let userService: UserService;

    beforeEach(() => {
        usersRepository = new InMemoryUserRepository();
        userService = new UserService(usersRepository);
    });

    test('should create a new user', async () => {
        const user = await userService.create({
            name: 'User Test',
            email: 'usertest@gmail.com',
            password: 'user123456789',
            profileImage: 'url://fakeurl'
        });

        expect(user).toHaveProperty('id');
    });

    test('should return an error when trying to create an existing user', async () => {
        await userService.create({
            name: 'User Test',
            email: 'useralredyexists@gmail.com',
            password: 'user123456789',
            profileImage: 'url://fakeurl'
        });

        expect(async () => {
            await userService.create({
                name: 'User Test',
                email: 'useralredyexists@gmail.com',
                password: 'user123456789',
                profileImage: 'url://fakeurl'
            });
        }).rejects.toThrow('User Alredy Exists');
    });

    test('should find a user by email', async () => {
        await userService.create({
            name: 'User Test',
            email: 'usertest@gmail.com',
            password: 'user123456789',
            profileImage: 'url://fakeurl'
        });

        const user = await userService.findByEmail('usertest@gmail.com');
        expect(user).toBe(true);
    });

    test('should return false when a user is not found by email', async () => {
        const user = await userService.findByEmail('usertest123@gmail.com');
        expect(user).toBe(false);
    });
});