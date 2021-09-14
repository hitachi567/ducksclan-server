
class ResponseLoginDto {
    refreshToken: string;
    accessToken: string;
}

export default class AuthService {
    login(login: string, password: string): ResponseLoginDto {
        return {
            refreshToken: '',
            accessToken: ''
        }
    }

    logout(refreshToken: string): void {

    }

    refresh(refreshToken: string): ResponseLoginDto {
        return {
            refreshToken: '',
            accessToken: ''
        }
    }
}