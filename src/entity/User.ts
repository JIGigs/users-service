import { Field, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index,
} from 'typeorm';

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  firstName: string;

  @Field({ nullable: true })
  @Column({
    type: 'text',
    nullable: true,
  })
  otherNames: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Index({ unique: true })
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field({ nullable: true })
  @Column({
    type: 'text',
    nullable: true,
  })
  accountType: string;
}
