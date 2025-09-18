import {
    Schema,
    Prop,
    SchemaFactory
} from "@nestjs/mongoose";

import {
    // Document,
    Types
} from "mongoose";

@Schema({timestamps: true})
export class Singnup {
    @Prop({
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    })
    email: string

    @Prop({
        minLength: 7,
        max: 12,
        required: true
    })
    password: string

    @Prop({
        required: true
    })
    country: string

}

export const authSchema = SchemaFactory.createForClass(Singnup);