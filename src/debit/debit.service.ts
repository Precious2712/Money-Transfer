import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDebitDto } from './dto/create-debit-dto';
import { DebitAlert } from './schema/debit-schema';
import { BankAccount } from 'src/bank-account/BankSchema/bank-account.schema';
import { Types } from 'mongoose';
import { randomUUID } from 'crypto';

@Injectable()
export class DebitService {
    constructor(
        @InjectModel(DebitAlert.name) private debitAlertModel: Model<DebitAlert>,
        @InjectModel(BankAccount.name) private bankAccountModel: Model<BankAccount>
    ) { }

    async createDebitAlert(createDebitDto: CreateDebitDto) {
        const {
            Amount,
            sender,
            creditReciever,
            recieverEmail,
            recieverBankName,
            recieverAccountNo,
            recieverFirstName,
            recieverLastName,
            recieverMiddleName,
            country,
        } = createDebitDto;

        const requiredFields = {
            Amount,
            sender,
            creditReciever,
            recieverEmail,
            recieverBankName,
            recieverAccountNo,
            recieverFirstName,
            recieverLastName,
            recieverMiddleName,
            country,
        };

        for (const [key, value] of Object.entries(requiredFields)) {
            if (!value) throw new NotFoundException(`Missing field: ${key}`);
        }

        const senderAccount = await this.bankAccountModel.findOne({
            user: new Types.ObjectId(sender),
        });

        if (!senderAccount) {
            throw new BadRequestException('Sender account not found');
        }

        if (Amount > senderAccount.balance) {
            throw new BadRequestException('Not enough funds');
        }

        senderAccount.balance -= Amount;
        await senderAccount.save();

        let receiverAccount = await this.bankAccountModel.findOne({
            user: new Types.ObjectId(creditReciever),
        });

        if (receiverAccount) {
            receiverAccount.balance += Amount;
            await receiverAccount.save();
        }

        const transactionId = randomUUID();

        const debit = await this.debitAlertModel.create({
            ...createDebitDto,
            recieverId: new Types.ObjectId(creditReciever), 
            senderId: new Types.ObjectId(sender),          
            debitReceipt: transactionId,
        });

        return {
            message: 'Debit transaction success',
            transactionId,
            debit,
            remainingBal: senderAccount.balance,
        };
    }


    async userDebitsTransactions(id: string) {
        const debitRef = await this.debitAlertModel.find({ sender: id });
        if (!debitRef) {
            throw new BadRequestException('Not Id');
        }

        return {
            message: 'Found document',
            debitRef
        }
    }

    async deletedDebitRef(id: string) {
        try {
            const objectId = new Types.ObjectId(id.trim());
            const delRef = await this.debitAlertModel.findByIdAndDelete(objectId);

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