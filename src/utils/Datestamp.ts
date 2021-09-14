import moment from "moment";

export default class Datestamp {
    readonly DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS';
    day: string;
    time: string;
    daytime: string;
    fromNow: string | undefined;
    noSeparator: string;

    constructor(date?: string, format?: string) {
        const dateMoment = moment(date || new Date(), format);
        this.day = dateMoment.format('YYYY-MM-DD');
        this.time = dateMoment.format('HH:mm:ss.SSS');
        this.daytime = dateMoment.format(this.DATE_FORMAT);
        this.fromNow = dateMoment.isBefore() ? dateMoment.fromNow() : undefined;
        this.noSeparator = dateMoment.format('YYYYMMDDHHmmssSSS');
    }
}
