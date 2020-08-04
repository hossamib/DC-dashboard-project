var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
    name: 'Node to MS SQL Server',
    description: 'example to connect to SQL server by mssql',
    script: 'D:\\SE-Projects\\Node_Projects\\NodeToSQLServer\\nodeToSqlServer.js',
    nodeOptions: [
            '--harmony',
            '--max_old_space_size=4096'
        ]
        //, workingDirectory: '...'
        //, allowServiceLogon: true
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function() {
    svc.start();
});

svc.install();