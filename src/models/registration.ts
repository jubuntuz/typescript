import { blank } from ".";
import { read } from "./../lib";

export class Registration {
    hospital!: string;
    location!: string;
    lastname!: string;
    firstname!: string;
    bod!: Date;
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
        console.log(def);
        def.date = (def.date === undefined || def.date === "") ? new Date() : new Date(def.date);
        def.hcnNotAvailable = JSON.parse(def.hcnNotAvailable);
        console.log(def);
        console.log(`${typeof (def.date)}, ${typeof (def.hcnNotAvailable)}`);
        
        process.exit();
        return def;
    }


}

