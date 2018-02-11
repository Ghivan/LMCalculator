const AvatarsPath = {
    OATH_KEEPER: `/img/avatars/OathKeeper.png`,
    INCINERATOR: `/img/avatars/Incinerator.png`,
    ETHEREAL_GUIDE: `/img/avatars/EtherealGuide.png`,
    THE_BIG_GUY: `/img/avatars/TheBigGuy.png`
};

const AvatarsList = [
    {
        id: '1',
        name: 'Хранитель клятвы',
        path: AvatarsPath.OATH_KEEPER
    },
    {
        name: 'Зажигалка',
        path: AvatarsPath.INCINERATOR
    },
    {
        id: 2,
        name: 'Эфирный странник',
        path: AvatarsPath.ETHEREAL_GUIDE
    },
    {
        id: 3,
        name: 'Толстяк',
        path: AvatarsPath.THE_BIG_GUY
    }
];

module.exports = {
    LIST: AvatarsList,
    PATHS: AvatarsPath
};