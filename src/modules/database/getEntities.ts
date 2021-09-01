import ActrivateLink from './entities/ActivateLink';
import DisabledReasons from './entities/DisabledReasons';
import DisabledUser from './entities/DisabledUser';
import Token from './entities/Token';
import User from './entities/User';
import UserOnline from './entities/UserOnline';
import UserPhoto from './entities/UserPhoto';

export default function getEntities() {
    return [
        ActrivateLink,
        DisabledReasons,
        DisabledUser,
        Token,
        User,
        UserOnline,
        UserPhoto,
    ]
}
