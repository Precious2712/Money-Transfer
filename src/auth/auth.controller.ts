import {
    Body,
    Controller,
    Post,
    Get,
    Param,
    Put,
    UseGuards,
    Request
} from '@nestjs/common';
import { LoginResponse } from './auth.service';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth-dto';
import { UpdateAuthDto } from './dto/update-auth-dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('/create')
    create(@Body() createAuth: CreateAuthDto) {
        return this.authService.signupUser(createAuth);
    }

    @Post('/login')
    getUser(@Body() body: { email: string; password: string }): Promise<LoginResponse> {
        const { email, password } = body;
        return this.authService.login(email, password);
    }

    @Get()
    getAuth() {
        return this.authService.getAllUser();
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        const user = await this.authService.userId(req.user.userId);

        if (!user) {
            return { message: 'User not found' };
        }

        return {
            message: 'This is a protected profile route',
            user, 
        };
    }

    @Get('/:id')
    getSingleUserId(@Param('id') id: string) {
        return this.authService.userId(id);
    }

    @Get('/test')
    testAuth() {
        return { message: 'Auth test endpoint working!', color: 'red' };
    }

    @Put('/:id')
    async update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
        return this.authService.updateUserData(id, updateAuthDto);
    }

}
