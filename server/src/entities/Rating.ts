import { Field, Int, ObjectType } from "type-graphql";
import { Entity, BaseEntity, ManyToOne, PrimaryColumn, Column } from "typeorm";
import { Book } from "./Book";
import { User } from "./User";

@ObjectType()
@Entity()
export class Rating extends BaseEntity {
  @Field(() => Int)
  @Column({ type: "int" })
  value: number;

  @Field(() => Int)
  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, (user) => user.booksRated)
  user: User;

  @Field(() => Int)
  @PrimaryColumn()
  bookId: number;

  @ManyToOne(() => Book, (book) => book.ratedBy, {
    onDelete: "CASCADE",
  })
  book: Book;
}
