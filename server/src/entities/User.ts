import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Book } from "./Book";
import { Rating } from "./Rating";

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

  @OneToMany(() => Rating, (rating) => rating.user)
  booksRated: Rating[];

  @Field(() => [Book], { nullable: true })
  @OneToMany(() => Book, (book) => book.poster)
  booksAdded?: Book[];

  @Field(() => [Book], { nullable: true })
  @ManyToMany(() => Book, (book) => book.bookmarkedBy)
  @JoinTable()
  bookmarks?: Book[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
