const PermissionNames = {    
    workspace : {
        read: 'read:workspace',
        edit: 'edit:workspace'
    },
    projects: {
        read: 'read:projects',
        edit: 'edit:projects'
    },
    tasks: {
        read: 'read:tasks',
        edit: 'edit:tasks'
    },
    teams : {
        read: 'read:teams',
        edit: 'edit:teams'
    },
    persons : {
        read: 'read:persons',
        edit: 'edit:persons'
    },
    absences : {
        read: 'read:absences',
        edit: 'edit:absences',
        delete: 'delete:absences'
    },
    dataloader : {
        use: 'use:dataloader'
    }
    
};

module.exports = PermissionNames;