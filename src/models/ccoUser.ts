class ccoUser {
    domain: string;
    username: string;
    password: string;
    constructor(domain: string = "ccodsqa", username: string = "junhong.zhang", password: string = "G0dkn0ws!123") {
        this.domain = domain;
        this.username = username;
        this.password = password;
    }
}

export { ccoUser };
