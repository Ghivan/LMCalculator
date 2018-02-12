const {ROLES} = require('../../model/constants');

const AccessPermission = {
    ADMIN: 'admin only',
    REQUESTING_PLAYER: 'requesting player',
    ALL: 'all'
};

module.exports = {
    AccessPermission,
    checkPlayerAccessRights: (AccessRights, req) => {
        const requestingPlayer = req.body.loggedInPlayer;
        switch (AccessRights) {
            case (AccessPermission.ADMIN):
                return (requestingPlayer.role === ROLES.ADMIN || requestingPlayer.role === ROLES.OWNER);
            case (AccessPermission.REQUESTING_PLAYER):
                const requestedPlayerId = req.params.id;
                return (requestingPlayer.id === requestedPlayerId || requestingPlayer.role === ROLES.ADMIN || requestingPlayer.role === ROLES.OWNER);
            case (AccessPermission.ALL):
                return true;
            default:
                return false;
        }
    }
};
