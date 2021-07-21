import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { User } from "./User";

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
  rating?: number;

  @Field()
  @ManyToOne(() => User, (user) => user.booksAdded)
  poster: User;
}
