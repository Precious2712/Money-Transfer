import {
    Body,
    Controller,
    Post,
    Get,
    Param,
    Put,
    UseGuards,
    Request,
    Options
} from '@nestjs/common';
import { LoginResponse } from './auth.service';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth-dto';
import { UpdateAuthDto } from './dto/update-auth-dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // Handle CORS preflight for signup
    @Options('create')
    @Public()
    handleCreateOptions() {
        return {};
    }

    @Post('/create')
    @Public()
    create(@Body() createAuth: CreateAuthDto) {
        return this.authService.signupUser(createAuth);
    }

    // Handle CORS preflight for login
    @Options('login')
    @Public()
    handleLoginOptions() {
        return {};
    }

    @Post('/login')
    @Public()
    getUser(@Body() body: { email: string; password: string }): Promise<LoginResponse> {
        const { email, password } = body;
        return this.authService.login(email, password);
    }

    // Handle CORS preflight for profile (even though it's protected)
    @Options('profile')
    @Public()
    handleProfileOptions() {
        return {};
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

    // Handle CORS preflight for getAll
    @Options()
    @Public()
    handleGetAllOptions() {
        return {};
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAuth() {
        return this.authService.getAllUser();
    }

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    getSingleUserId(@Param('id') id: string) {
        return this.authService.userId(id);
    }

    // Handle CORS preflight for test
    @Options('test')
    @Public()
    handleTestOptions() {
        return {};
    }

    @Get('/test')
    @Public()
    testAuth() {
        return { message: 'Auth test endpoint working!', color: 'red' };
    }

    @Put('/:id')
    @UseGuards(JwtAuthGuard)
    async update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
        return this.authService.updateUserData(id, updateAuthDto);
    }
}