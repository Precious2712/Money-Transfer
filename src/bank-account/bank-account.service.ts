import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { BankAccount } from './BankSchema/bank-account.schema';
import { Singnup } from 'src/auth/schema/auth.schema';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { Types } from 'mongoose';

@Injectable()
export class BankAccountService {
    constructor(
        @InjectModel(BankAccount.name) private bankAccountModel: Model<BankAccount>,
        @InjectModel(Singnup.name) private signupModel: Model<Singnup>
    ) {}

    async createBankData(createBankAccountDto: CreateBankAccountDto) {
        const { user, ...rest } = createBankAccountDto;

        const existingUser = await this.signupModel.findById(user);
        if (!existingUser) {
            throw new NotFoundException('User not found');
        }

        const allowedBanks = [
            'Guaranty Trust Bank (GTBank)',
            'United Bank for Africa (UBA)',
            'Ecobank',
            'Access Bank',
            'Zenith Bank',
            'First Bank of Nigeria',
            'MoniePoint',
            'Opay',
            'Union Bank of Nigeria',
            'Stanbic IBTC Bank',
            'Fidelity Bank',
            'Sterling Bank',
            'Polaris Bank',
            'Keystone Bank',
            'Wema Bank',
            'Jaiz Bank',
            'Unity Bank',
        ];

        if (!['male', 'female'].includes(createBankAccountDto.gender.toLowerCase())) {
            throw new BadRequestException('Gender must be either male or female');
        }

        if (!allowedBanks.includes(createBankAccountDto.bankName)) {
            throw new BadRequestException('Bank name not supported');
        }

        const userBankAcctData = await this.bankAccountModel.create({
            ...rest,
            user: existingUser._id,
            country: existingUser.country,
            email: existingUser.email,
        });

        return {
            message: 'Bank account created successfully',
            userBankAcctData,
        };
    }

    async updateBalance(id: string, updateBankAccountDto: UpdateBankAccountDto) {
        const { balance } = updateBankAccountDto;

        if (!balance || balance <= 0) {
            throw new BadRequestException('Invalid balance amount');
        }

        const user = await this.signupModel.findById(id);
        console.log(user);

        if (!user) {
            throw new BadRequestException('No user found with this id');
        }

        const updatedAccount = await this.bankAccountModel.findOneAndUpdate(
            { user: new Types.ObjectId(id) },
            { $inc: { balance: balance } },
            { new: true }
        );

        if (!updatedAccount) {
            throw new BadRequestException('No bank account found for this user');
        }

        return {
            message: 'Balance updated successfully',
            newBalance: updatedAccount.balance,
        };
    }

    async getUser(id: string) {
        const userAccount = await this.bankAccountModel.findOne({
            user: new Types.ObjectId(id)
        });

        if (!userAccount) {
            throw new BadRequestException('No bank account found for this user');
        }

        return {
            message: 'Bank account found',
            userAccount
        }
    }

    async search(filters: { bankName?: string; accountNo?: string }) {
        const { bankName, accountNo } = filters;

        const query: Record<string, any> = {};
        if (bankName) query.bankName = bankName;
        if (accountNo) query.accountNo = accountNo;

        const result = await this.bankAccountModel.find(query);

        if (!result) {
            throw new BadRequestException('No bank account found for this user');
        }

        return {
            success: true,
            message: "Bank account found",
            result
        }
    }

}