import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { UserCreateOneWithoutPostsInput } from "../inputs/UserCreateOneWithoutPostsInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class PostCreateInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true,
    description: undefined
  })
  id?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: false,
    description: undefined
  })
  title!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false,
    description: undefined
  })
  description!: string;

  @TypeGraphQL.Field(_type => UserCreateOneWithoutPostsInput, {
    nullable: false,
    description: undefined
  })
  author!: UserCreateOneWithoutPostsInput;
}
