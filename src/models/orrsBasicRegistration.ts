import { Visit, Payment, Demographic } from './orrsBase';

export class orrsBasicRegistration {
    visit = new Visit();
    demographic = new Demographic();
    payment = new Payment();

    constructor(registration: object) {
        Object.assign(this.visit, registration);
        Object.assign(this.demographic, registration);
        Object.assign(this.payment, registration);
    }
}

