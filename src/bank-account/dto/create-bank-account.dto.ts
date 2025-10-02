import { IsNotEmpty, IsString, IsEmail, IsNumber, IsIn, IsMongoId, IsOptional } from "class-validator";

export class CreateBankAccountDto {
  @IsNotEmpty()
  @IsMongoId()
  user: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  middleName: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  nationality: string;

  @IsNotEmpty()
  @IsString()
  @IsIn([
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
    'Unity Bank'
  ])
  bankName: string;

  @IsNotEmpty()
  @IsString()
  accountNo: string;

  @IsNotEmpty()
  @IsNumber()
  bvn: number;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNumber()
  @IsOptional()
  balance?: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}