import { read, toDate } from "./../lib";

export class Registration {
    hospital!: string;
    location!: string;
    lastname!: string;
    firstname!: string;
    dob!: Date;
    gender!: string;
    race!: string;
    street!: string;
    addrProvince!: string;
    postalcode!: string;
    responsibilityForPayment!: string;
    hcnNotAvailable!: boolean;
    hcnNo!: string;
    hcnProvince!: string;
    date!: Date;

    basic = (reg: object) => {
        let def = Object.assign(this as Registration, read("registration").basic, reg);
        def.date = toDate(def.date);
        def.dob = toDate(def.dob);
        def.hcnNotAvailable = JSON.parse(def.hcnNotAvailable);
        return def;
    }


}

