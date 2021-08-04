import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { User } from "./User";
import { Rating } from "./Rating";

@ObjectType()
@Entity()
export class Book extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  author: string;

  @Field()
  @Column()
  plot: string;

  @Field(() => Int)
  @Column()
  year: number;

  @Field(() => Int)
  @Column({ type: "int", default: 0 })
  totalRaters: number;

  @Field(() => Int)
  @Column({ type: "int", default: 0 })
  totalStars: number;

  @Field(() => [Rating], { nullable: true })
  @OneToMany(() => Rating, (rating) => rating.book)
  ratedBy?: Rating[];

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, (user) => user.bookmarks)
  bookmarkedBy?: User[];

  @Field()
  @ManyToOne(() => User, (user) => user.booksAdded)
  poster: User;

  @Field({ nullable: true })
  bookmarkStatus?: boolean;
}
