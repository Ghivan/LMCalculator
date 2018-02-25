export const getFormattedTime = seconds => {
    return {
        days: Math.floor(seconds / 86400),
        hours: Math.floor((seconds % 86400) / 3600),
        minutes: Math.floor(((seconds % 86400) % 3600) / 60),
        seconds: ((seconds % 86400) % 3600) % 60
    }
};

export const getRightWordForm = number => {
    const rest = number % 10;
    if (rest === 0 || rest >= 5 || (number >= 10 && number <= 19)) {
        return {
            days: 'дней',
            hours: 'часов',
            minutes: 'минут',
            seconds: 'секунд'
        }
    }

    if (rest === 1) {
        return {
            days: 'день',
            hours: 'час',
            minutes: 'минута',
            seconds: 'секунда'
        }
    }

    if (rest >= 2 && rest <= 4) {
        return {
            days: 'дня',
            hours: 'часа',
            minutes: 'минуты',
            seconds: 'секунды'
        }
    }

};

export const countTimeWithSpeedBonus = (seconds, speedBonus) => {
    return Math.ceil(seconds / (1 + speedBonus / 100))
};

export const countTimeWithHelp = (seconds, helpNumber) => {
    let rest = seconds;
    for (let i = 0; i < helpNumber; i++) {
        const speedUp = rest * 0.99;
        (rest - speedUp) < 60 ? rest = rest - 60 : rest = speedUp;
    }
    return rest < 0 ? 0 : Math.ceil(rest);
};
