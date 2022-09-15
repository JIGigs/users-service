import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { hash } from 'bcryptjs';
import { User } from './entity/User';

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'Hi!';
  }

  @Query(() => [User])
  users() {
    return User.find();
  }

  @Mutation(() => Boolean)
  async register(
    @Arg('email', () => String) email: string,
    @Arg('password') password: string,
    @Arg('firstName') firstName: string,
    @Arg('otherNames', () => String, { nullable: true })
    otherNames: string,
    @Arg('lastName') lastName: string,
    @Arg('accountType', () => String, { nullable: true })
    accountType: string
  ) {
    const hashedPassword = await hash(password, 12);
    if (accountType === undefined) accountType = 'job-seeker';
    try {
      await User.insert({
        email,
        password: hashedPassword,
        firstName,
        otherNames,
        lastName,
        accountType,
      });
    } catch (error) {
      console.log('User insertion error', error);
      return false;
    }

    return true;
  }
}
