export class TimeTransformer {

    constructor(seconds) {
        const days = Math.floor(seconds / 60 / 60 / 24);
        seconds = seconds - days * 60 * 60 * 24;
        const hours = Math.floor(seconds / 60 / 60);
        seconds = seconds - hours * 60 * 60;
        const minutes = Math.floor(seconds / 60);
        seconds = seconds - minutes * 60;
        this.days = days;
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }

    toSeconds() {
        return this.days * 60 * 60 * 24 + this.hours * 60 * 60 + this.minutes * 60 + this.seconds
    }
}

export const countTimeWithSpeedBonus = (seconds, speedBonus) => {
    return Math.ceil(seconds / (1 + speedBonus / 100))
};

export const countTimeWithHelp = (seconds, helpNumber) => {
    let rest = seconds;
    let bonus = 0.01;
    for (let i = 0; i < helpNumber; i++) {
        const speedUp = Math.round(rest - rest * bonus);
        console.log('hand: ' + i, new TimeTransformer(Math.ceil(rest)));
        (rest - speedUp) < 60 ? rest = rest - 60 : rest = speedUp;
    }
    return rest < 0 ? 0 : Math.ceil(rest);
};
