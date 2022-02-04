import User from './user';
import UserOnline from './user.online';
import UserProfile from './user.profile';
import TokenRefresh from './token.refresh';
import ConfirmLink from './confirm.link';

export {
    User,
    UserOnline,
    UserProfile,
    TokenRefresh as RefreshToken,
    ConfirmLink
}

export default [
    User,
    UserOnline,
    UserProfile,
    TokenRefresh,
    ConfirmLink
]
