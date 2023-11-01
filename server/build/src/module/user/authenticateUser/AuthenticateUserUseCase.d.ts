export default class AuthenticateUserUseCase {
    execute({ email, password }: {
        email: any;
        password: any;
    }): Promise<{
        user: any;
        token: string;
    }>;
}
