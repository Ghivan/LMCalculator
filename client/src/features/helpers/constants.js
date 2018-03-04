export const RESOURCES_TYPE = {
    FOOD: 'food',
    TIMBER: 'timber',
    STONE: 'stone',
    ORE: 'ore',
    GOLD: 'gold'
};

export const TROOPS_TIERS = {
    T1: 'tier1',
    T2: 'tier2',
    T3: 'tier3',
    T4: 'tier4'
};

export const TROOPS_CLASSES = {
    CAVALRY: 'cavalry',
    SIEGE: 'siege',
    RANGED: 'ranged',
    INFANTRY: 'infantry'
};

export const TROOPS_TRAINING_TIME = {
    [TROOPS_TIERS.T1]: 15,
    [TROOPS_TIERS.T2]: 30,
    [TROOPS_TIERS.T3]: 60,
    [TROOPS_TIERS.T4]: 120
};

export const TROOPS_MIGHT = {
    [TROOPS_TIERS.T1]: 2,
    [TROOPS_TIERS.T2]: 8,
    [TROOPS_TIERS.T3]: 24,
    [TROOPS_TIERS.T4]: 36
};



export const TROOPS_COST = {
    [TROOPS_CLASSES.INFANTRY]: {
        [TROOPS_TIERS.T1]: {
            [RESOURCES_TYPE.FOOD]: 50,
            [RESOURCES_TYPE.TIMBER]: 50,
            [RESOURCES_TYPE.ORE]: 50
        },
        [TROOPS_TIERS.T2]: {
            [RESOURCES_TYPE.FOOD]: 100,
            [RESOURCES_TYPE.TIMBER]: 100,
            [RESOURCES_TYPE.ORE]: 100,
            [RESOURCES_TYPE.GOLD]: 5
        },
        [TROOPS_TIERS.T3]: {
            [RESOURCES_TYPE.FOOD]: 150,
            [RESOURCES_TYPE.TIMBER]: 150,
            [RESOURCES_TYPE.ORE]: 150,
            [RESOURCES_TYPE.GOLD]: 10
        },
        [TROOPS_TIERS.T4]: {
            [RESOURCES_TYPE.FOOD]: 1000,
            [RESOURCES_TYPE.TIMBER]: 1000,
            [RESOURCES_TYPE.ORE]: 1000,
            [RESOURCES_TYPE.GOLD]: 500
        },
    },
    [TROOPS_CLASSES.RANGED]: {
        [TROOPS_TIERS.T1]: {
            [RESOURCES_TYPE.FOOD]: 50,
            [RESOURCES_TYPE.TIMBER]: 50,
            [RESOURCES_TYPE.STONE]: 50
        },
        [TROOPS_TIERS.T2]: {
            [RESOURCES_TYPE.FOOD]: 100,
            [RESOURCES_TYPE.TIMBER]: 100,
            [RESOURCES_TYPE.STONE]: 100,
            [RESOURCES_TYPE.GOLD]: 5
        },
        [TROOPS_TIERS.T3]: {
            [RESOURCES_TYPE.FOOD]: 150,
            [RESOURCES_TYPE.TIMBER]: 150,
            [RESOURCES_TYPE.STONE]: 150,
            [RESOURCES_TYPE.GOLD]: 10
        },
        [TROOPS_TIERS.T4]: {
            [RESOURCES_TYPE.FOOD]: 1000,
            [RESOURCES_TYPE.TIMBER]: 1000,
            [RESOURCES_TYPE.STONE]: 1000,
            [RESOURCES_TYPE.GOLD]: 500
        },
    },
    [TROOPS_CLASSES.CAVALRY]: {
        [TROOPS_TIERS.T1]: {
            [RESOURCES_TYPE.FOOD]: 50,
            [RESOURCES_TYPE.STONE]: 50,
            [RESOURCES_TYPE.ORE]: 50
        },
        [TROOPS_TIERS.T2]: {
            [RESOURCES_TYPE.FOOD]: 100,
            [RESOURCES_TYPE.STONE]: 100,
            [RESOURCES_TYPE.ORE]: 100,
            [RESOURCES_TYPE.GOLD]: 5
        },
        [TROOPS_TIERS.T3]: {
            [RESOURCES_TYPE.FOOD]: 150,
            [RESOURCES_TYPE.STONE]: 150,
            [RESOURCES_TYPE.ORE]: 150,
            [RESOURCES_TYPE.GOLD]: 10
        },
        [TROOPS_TIERS.T4]: {
            [RESOURCES_TYPE.FOOD]: 1000,
            [RESOURCES_TYPE.STONE]: 1000,
            [RESOURCES_TYPE.ORE]: 1000,
            [RESOURCES_TYPE.GOLD]: 500
        },
    },

    [TROOPS_CLASSES.SIEGE]: {
        [TROOPS_TIERS.T1]: {
            [RESOURCES_TYPE.FOOD]: 50,
            [RESOURCES_TYPE.TIMBER]: 50,
            [RESOURCES_TYPE.ORE]: 50,
            [RESOURCES_TYPE.STONE]: 50
        },
        [TROOPS_TIERS.T2]: {
            [RESOURCES_TYPE.FOOD]: 100,
            [RESOURCES_TYPE.TIMBER]: 100,
            [RESOURCES_TYPE.ORE]: 100,
            [RESOURCES_TYPE.GOLD]: 5,
            [RESOURCES_TYPE.STONE]: 100
        },
        [TROOPS_TIERS.T3]: {
            [RESOURCES_TYPE.FOOD]: 150,
            [RESOURCES_TYPE.TIMBER]: 150,
            [RESOURCES_TYPE.ORE]: 150,
            [RESOURCES_TYPE.GOLD]: 10,
            [RESOURCES_TYPE.STONE]: 150
        },
        [TROOPS_TIERS.T4]: {
            [RESOURCES_TYPE.FOOD]: 1000,
            [RESOURCES_TYPE.TIMBER]: 1000,
            [RESOURCES_TYPE.ORE]: 1000,
            [RESOURCES_TYPE.GOLD]: 500,
            [RESOURCES_TYPE.STONE]: 1000
        },
    },
};

