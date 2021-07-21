import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Book } from "./Book";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Book, (book) => book.poster)
  booksAdded: Book[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
