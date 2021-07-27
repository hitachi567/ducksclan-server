import DisabledReasons from './entities/DisabledReasons';
import User from './entities/User';
import UserActivate from './entities/UserActivate';
import UserDisabled from './entities/UserDisabled';
import UserOnline from './entities/UserOnline';
import PictureAlbum from './entities/PictureAlbum';

export default function getEntities() {
    return [
        DisabledReasons,
        User,
        UserActivate,
        UserDisabled,
        UserOnline,
        PictureAlbum,
    ]
}
