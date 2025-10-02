import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDebitDto {
    @IsNumber()
    @IsNotEmpty()
    Amount: number;

    @IsString()
    @IsNotEmpty()
    recieverFirstName: string;

    @IsString()
    @IsNotEmpty()
    recieverLastName: string;

    @IsString()
    @IsNotEmpty()
    recieverMiddleName: string;

    @IsString()
    @IsNotEmpty()
    recieverBankName: string;

    @IsString()
    @IsNotEmpty()
    sender: string;

    @IsString()
    @IsNotEmpty()
    creditReciever: string;

    @IsString()
    @IsNotEmpty()
    recieverAccountNo: string;

    @IsString()
    @IsNotEmpty()
    country: string;

    @IsString()
    @IsNotEmpty()
    recieverEmail: string;
}
