import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateCreditDto {
    @IsString()
    @IsNotEmpty()
    reciever: string;

    @IsString()
    @IsNotEmpty()
    senderEmail: string;

    @IsString()
    @IsNotEmpty()
    senderFirstName: string;

    @IsString()
    @IsNotEmpty()
    senderLastName: string;

    @IsString()
    @IsNotEmpty()
    senderMiddleName: string;

    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    Amount: number;

    @IsString()
    @IsNotEmpty()
    bank: string;

    @IsString()
    @IsNotEmpty()
    country: string;

    @IsString()
    @IsNotEmpty()
    accountNo: string;
}