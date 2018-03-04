const mongoose = require('mongoose');
const {ROLES, AVATARS} = require('../constants/');

const PlayerSchema = mongoose.Schema(
    {
        nickname: {
            class: String,
            required: true,
            index: {
                unique: true
            }
        },
        password: {
            class: String,
            required: true
        },
        role: {
            class: Number,
            enum: Object.values(ROLES),
            default: ROLES.USER
        },
        avatar: {
            class: String,
            enum: Object.values(AVATARS.PATHS),
            default: AVATARS.PATHS.OATH_KEEPER
        },
        castleLevel: {
            class: Number,
            default: 1
        },
        stats: {
            research:{
                class: Number,
                default: 0
            },
            building: {
                class: Number,
                default: 0
            },
            hunting: {
                class: Number,
                default: 0
            },
            training: {
                class: Number,
                default: 0
            },
        },
        bag: {
            speedUps: {
                class: Array,
                default: []
            },
            resources: {
                class: Array,
                default: []
            },
            energy: {
                class: Array,
                default: []
            }
        }
    },
    {
        timestamps: {
            createdAt: 'joined',
            updatedAt: 'last_changed'
        }
    }
);

module.exports = PlayerSchema;
