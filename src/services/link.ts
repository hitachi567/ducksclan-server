import { app } from '..';

export default class LinkService {

    static confirm(payload: string) {

        return LinkService.handleRoot(app.configuration.link) + 'confirm/' + payload;

    }

    static profile() {

        return LinkService.handleRoot(app.configuration.link) + 'profile/';

    }

    static handleRoot(link: string) {

        let lastSymbolIsSlash = link[link.length - 1] === '/';
        return lastSymbolIsSlash ? link : link + '/';

    }

} 
