const PermissionNames = {    
    team : {
        read: 'read:teams',
        edit: 'edit:teams'
    },
    person : {
        read: 'read:persons',
        edit: 'edit:persons'
    },
    absence : {
        read: 'read:absences',
        edit: 'edit:absences',
        delete: 'delete:absences'
    },
    dataloader : {
        use: 'use:dataloader'
    }
    
};

module.exports = PermissionNames;