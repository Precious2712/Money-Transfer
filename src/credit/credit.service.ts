import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreditAlert } from './schema/credit-schema';
import { BankAccount } from 'src/bank-account/BankSchema/bank-account.schema';
import { CreateCreditDto } from './dto/create-credit-dto';
import { randomUUID } from 'crypto';

@Injectable()
export class CreditService {
    constructor(
        @InjectModel(CreditAlert.name) private creditAlertModel: Model<CreditAlert>,
        @InjectModel(BankAccount.name) private bankAccountModel: Model<BankAccount>
    ) {}

    async creditUser(createCreditDto: CreateCreditDto) {
        const {
            reciever,
            senderEmail,
            Amount,
            accountNo,
            bank,
            country,
            senderFirstName,
            senderLastName,
            senderMiddleName
        } = createCreditDto;

        const requiredFields = {
            Amount,
            senderEmail,
            reciever,
            accountNo,
            bank,
            country,
            senderFirstName,
            senderLastName,
            senderMiddleName
        };

        for (const [key, value] of Object.entries(requiredFields)) {
            if (!value) {
                throw new NotFoundException(`Missing field: ${key}`);
            }
        }

        const receiver = await this.bankAccountModel.findOne({
            user: new Types.ObjectId(
                reciever),
        });

        if (!receiver) {
            throw new BadRequestException('Receiver account not found');
        }

        receiver.balance += Amount;
        await receiver.save();

        const transactionId = randomUUID();

        const credits = await this.creditAlertModel.create({
            ...createCreditDto,
            userId: new Types.ObjectId(
                reciever),
            creditReceipt: transactionId,
        });

        return {
            message: 'Credit transaction success',
            transactionId,
            credits,
            newBalance: receiver.balance,
        };
    }


    async userCreditsTransactions(id: string) {
        const creditRef = await this.creditAlertModel.find({
            reciever: id
        });
        if (!creditRef) {
            throw new BadRequestException('Not Id');
        }

        return {
            message: 'Found document',
            creditRef
        }
    }

    async deletedCreditRef(id: string) {
        try {
            const objectId = new Types.ObjectId(id.trim()); 
            const delRef = await this.creditAlertModel.findByIdAndDelete(objectId);

            if (!delRef) {
                throw new BadRequestException('ID document not found');
            }

            return {
                message: 'Document deleted',
                delRef
            };
        } catch (error) {
            throw new BadRequestException("Invalid ObjectId format");
        }
    }

}