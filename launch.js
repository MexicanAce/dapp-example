import { spawn } from 'child_process';

const child = spawn('sh', ['-c', "cd contracts && npm run start-etn >> server.log"], {
  detached: true,
  stdio: 'ignore'
});

child.unref();
// Wait 1 second
await new Promise(resolve => setTimeout(resolve, 1000));
console.log('Ganache server started in the background');
