import { blank } from ".";

export class Registration {
    hospital: string = blank;
    location: string = blank;
    lastname: string = blank;
    firstname: string = blank;
    bod: Date = new Date();
    gender: string = blank;
    race: string = blank;
    street: string = blank;
    addrProvince: string = blank;
    postalcode: string = blank;
    responsibilityForPayment: string = blank;
    hcnNotAvailable: boolean = false;
    hcnNo: string = blank;
    hcnProvince: string = blank;
    date: Date = new Date();

    constructor(registration: object) {
        Object.assign(this, registration);
    }

}

