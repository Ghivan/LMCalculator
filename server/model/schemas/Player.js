const mongoose = require('mongoose');
const {ROLES, AVATARS} = require('../constants/');

const PlayerSchema = mongoose.Schema(
    {
        nickname: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: Number,
            enum: Object.values(ROLES),
            default: ROLES.USER
        },
        avatar: {
            type: String,
            default: AVATARS.PATHS.OATH_KEEPER
        },
        castleLevel: {
            type: Number,
            default: 1
        },
        stats: {
            research:{
                type: Number,
                default: 0
            },
            building: {
                type: Number,
                default: 0
            },
            hunting: {
                type: Number,
                default: 0
            },
            training: {
                type: Number,
                default: 0
            },
        },
        bag: {
            speedUps: {
                type: Array,
                default: []
            },
            resources: {
                type: Array,
                default: []
            },
            energy: {
                type: Array,
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
