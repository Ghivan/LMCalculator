const SPEED_UPS_NAMES = {
    d30: 'd30',
    d7: 'd7',
    d3: 'd3',
    h24: 'h24',
    h15: 'h15',
    h8: 'h8',
    h3: 'h3',
    m60: 'm60',
    m30: 'm30',
    m15: 'm15',
    m10: 'm10',
    m5: 'm5',
    m3: 'm3',
    m1: 'm1'
};

const SPEED_UPS_TIME_TYPES = {
    [SPEED_UPS_NAMES.m1]: {
        label: '1 м',
        seconds: 60
    },
    [SPEED_UPS_NAMES.m3]: {
        label: '3 м',
        seconds: 180
    },
    [SPEED_UPS_NAMES.m5]: {
        label: '5 м',
        seconds: 300
    },
    [SPEED_UPS_NAMES.m10]: {
        label: '10 м',
        seconds: 600
    },
    [SPEED_UPS_NAMES.m15]: {
        label: '15 м',
        seconds: 900
    },
    [SPEED_UPS_NAMES.m30]: {
        label: '30 м',
        seconds: 1800
    },
    [SPEED_UPS_NAMES.m60]: {
        label: '60 м',
        seconds: 3600
    },
    [SPEED_UPS_NAMES.h3]: {
        label: '3 ч',
        seconds: 10800
    },
    [SPEED_UPS_NAMES.h8]: {
        label: '8 ч',
        seconds: 28800
    },
    [SPEED_UPS_NAMES.h15]: {
        label: '15 ч',
        seconds: 54000
    },
    [SPEED_UPS_NAMES.h24]: {
        label: '24 ч',
        seconds: 86400
    },
    [SPEED_UPS_NAMES.d3]: {
        label: '3 дня',
        seconds: 259200
    },
    [SPEED_UPS_NAMES.d7]: {
        label: '7 дней',
        seconds: 604800
    },
    [SPEED_UPS_NAMES.d30]: {
        label: '30 дней',
        seconds: 2592000
    }
};

const SPEED_UPS_SOURCE_TYPES = {
    universal: {
        label: 'Ускорение'
    },
    research: {
        label: 'Ускорение исследования'
    },
    training: {
        label: 'Ускорение тренировки'
    },
    crafting: {
        label: 'Ускорение создания'
    },
    healing: {
        label: 'Ускорение лечения'
    }
};

module.exports = {
    SPEED_UPS_SOURCE_TYPES,
    SPEED_UPS_TIME_TYPES,
    SPEED_UPS_NAMES
};