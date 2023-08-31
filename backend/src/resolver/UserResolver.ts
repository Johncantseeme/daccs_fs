import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { User } from '../entity/User';
import { getRepository } from 'typeorm';

@Resolver(User)
export class UserResolver {
    private userRepository = getRepository(User);

    @Query(() => [User])
    async users() {
        return await this.userRepository.find();
    }

    @Query(() => User, { nullable: true })
    async user(@Arg('id') id: number) {
        return await this.userRepository.findOne({ where: { id } });
    }

    @Mutation(() => User)
    async createUser(
        @Arg('firstName') firstName: string,
        @Arg('lastName') lastName: string,
        @Arg('email') email: string,
        @Arg('phoneNumber') phoneNumber: string,
        @Arg('iban') iban: string
    ) {
        const user = this.userRepository.create({firstName, lastName, email, phoneNumber, iban});
        return await this.userRepository.save(user);
    }


    @Mutation(() => User)
    async updateUser(
        @Arg('id') id: number,
        @Arg('firstName', {nullable: true}) firstName: string,
        @Arg('lastName', {nullable: true}) lastName: string,
        @Arg('email', {nullable: true}) email: string,
        @Arg('phoneNumber', {nullable: true}) phoneNumber: string,
        @Arg('iban', {nullable: true}) iban: string
    ) {
        const user = await this.userRepository.findOne({where: {id}});
        if (!user) throw new Error('User not found');
        Object.assign(user, {firstName, lastName, email, phoneNumber, iban});
        return await this.userRepository.save(user);
    }

    @Mutation(() => Boolean)
    async deleteUser(@Arg('id') id: number) {
        const user = await this.userRepository.findOne({where: {id}});
        if (!user) throw new Error('User not found');
        await this.userRepository.remove(user);
        return true;
    }
}
