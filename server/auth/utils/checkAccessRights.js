const {ROLES} = require('../../model/constants');

const AccessPermission = {
    ADMIN: 'admin only',
    REQUESTING_PLAYER: 'requesting player',
    ALL: 'all'
};

module.exports = {
    AccessPermission,
    checkPlayerAccessRights: (AccessRights, req) => {
        const {loggedInPlayer} = req.body;
        switch (AccessRights) {
            case (AccessPermission.ADMIN):
                return (loggedInPlayer.role === ROLES.ADMIN || loggedInPlayer.role === ROLES.OWNER);
            case (AccessPermission.REQUESTING_PLAYER):
                const requestedPlayerId = req.params.id;
                return (loggedInPlayer.id === requestedPlayerId || loggedInPlayer.role === ROLES.ADMIN || loggedInPlayer.role === ROLES.OWNER);
            case (AccessPermission.ALL):
                return true;
            default:
                return false;
        }
    }
};
