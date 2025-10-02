import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true })
export class BankAccount {
    @Prop({ type: Types.ObjectId, ref: 'Signup', required: true })
    user: Types.ObjectId;

    @Prop({ required: true, unique: true })
    firstName: string;

    @Prop({ required: true, unique: true })
    lastName: string;

    @Prop({ required: true, unique: true })
    middleName: string;

    @Prop({ required: true, enum: ['male', 'Male', 'female', 'Female'] })
    gender: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    nationality: string;

    @Prop({
        required: true,
        unique: true,
        enum: [
            'Access Bank',
            'Zenith Bank',
            'First Bank of Nigeria',
            'United Bank for Africa (UBA)',
            'Guaranty Trust Bank (GTBank)',
            'Union Bank of Nigeria',
            'Stanbic IBTC Bank',
            'Fidelity Bank',
            'Ecobank Nigeria',
            'Sterling Bank',
            'Polaris Bank',
            'Keystone Bank',
            'Wema Bank',
            'Jaiz Bank',
            'Unity Bank',
            'MoniePoint',
            'Opay',
        ],
    })
    bankName: string;

    @Prop({ required: true, unique: true })
    accountNo: string;

    @Prop({ required: true, unique: true })
    bvn: number;

    @Prop({ required: true })
    country: string;

    @Prop({ required: true, default: 0 })
    balance: number;

    @Prop({
        required: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    })
    email: string;
}

export const BankAccountSchema = SchemaFactory.createForClass(BankAccount);