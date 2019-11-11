export class Visit {
    hospital = "WRH";
    location = "WHD";
    date = {
        year: new Date().getFullYear().toString(),
        month: new Date().getMonth().toString(),
        day: new Date().getDay().toString()
    }
}

export class Demographic {
    name = {
        lastname: "Automation",
        firstname: "poc"
    }
    bod = {
        year: "1980",
        month: "5",
        day: "10"
    }
    gender = "M";
    races = "3";
    address = {
        street: "Holywood street",
        province: "ON",
        postalcode: "A1B2C3"
    }
}

export class Payment {
    responsibilityForPayment = "01";
    hcn = {
        notAvailable: true,
        hcnNo: "3586655478",
        province: "Ontario"
    }
}

