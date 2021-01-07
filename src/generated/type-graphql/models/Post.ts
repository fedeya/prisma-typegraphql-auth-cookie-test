import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { User } from "../models/User";

@TypeGraphQL.ObjectType({
  isAbstract: true,
  description: undefined,
  simpleResolvers: undefined,
})
export class Post {
  @TypeGraphQL.Field(_type => String, {
    nullable: false,
    description: undefined,
  })
  id!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false,
    description: undefined,
  })
  title!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false,
    description: undefined,
  })
  description!: string;

  author?: User;

  @TypeGraphQL.Field(_type => String, {
    nullable: false,
    description: undefined,
  })
  authorId!: string;
}
