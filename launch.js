import { spawn } from 'child_process';

const child = spawn('sh', ['-c', "cd contracts && npm run start-etn >> server.log"], {
  detached: true,
  stdio: 'ignore'
});

child.unref();
console.log('Ganache server started in the background');
