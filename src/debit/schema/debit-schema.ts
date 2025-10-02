import {
    Prop,
    Schema,
    SchemaFactory
} from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true })
export class DebitAlert {
    @Prop({
        required: true
    })
    recieverEmail: string;

    @Prop({ type: Types.ObjectId, ref: 'BankAccount', required: true })
    sender: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'BankAccount', required: true })
    creditReciever: Types.ObjectId;

    @Prop({
        default: 0
    })
    Amount: number;

    @Prop({
        required: true
    })
    recieverFirstName: string;

    @Prop({
        required: true
    })
    recieverLastName: string;

    @Prop({
        required: true
    })
    recieverMiddleName: string;

    @Prop({
        required: true
    })
    recieverBankName: string;

    @Prop({
        required: true
    })
    recieverAccountNo: string;

    @Prop({
        required: true
    })
    country: string;

    @Prop({
        default: true
    })
    debitReceipt: string;
}

export const DebitSchema = SchemaFactory.createForClass(DebitAlert);