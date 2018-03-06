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