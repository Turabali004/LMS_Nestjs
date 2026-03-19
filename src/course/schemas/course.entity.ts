
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Course>;

@Schema()
export class Course {
  @Prop({ required: true })
  name!: string;

  @Prop()
  description!: string;

  @Prop()
  level!: string;

  @Prop({ required: true })
  price!: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
