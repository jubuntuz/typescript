import { By } from "selenium-webdriver";

export interface demographicBy {
    name: {
        lastnameTxt: By,
        firstnameTxt: By
    },
    bod: dateBy,
    genderSel: By
    raceSel: By
    address: {
        streetTxt: By
        provinceSel: By
        postalcodeTxt: By
    }
}

export interface paymentBy {
    notAvailableChk: By,
    hcnNoTxt: By,
    provinceSel: By,
    responsibilityForPaymentTxt: By
}

export interface visitBy {
    hospitalSel: By,
    locationSel: By,
    date: dateBy
}

export interface dateBy {
    yearTxt: By,
    monthSel: By,
    dayTxt: By
}
