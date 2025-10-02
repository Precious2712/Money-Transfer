import {
    Prop,
    Schema,
    SchemaFactory
} from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true })
export class CreditAlert {
    @Prop({ type: Types.ObjectId, ref: 'BankAccount', required: true })
    reciever: Types.ObjectId;

    @Prop({
        required: true
    })
    senderEmail: string;

    @Prop({
        required: true
    })
    senderFirstName: string;

    @Prop({
        required: true
    })
    senderLastName: string;

    @Prop({
        required: true
    })
    senderMiddleName: string;

    @Prop({
        required: true
    })
    Amount: number;

    @Prop({
        required: true
    })
    bank: string;

    @Prop({
        required: true
    })
    country: string;

    @Prop({
        required: true
    })
    accountNo: string;

    @Prop({
        default: true
    })
    creditReceipt: string;
}

export const creditSchema = SchemaFactory.createForClass(CreditAlert);