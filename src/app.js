const http = require('http');
const util = require('util');

const version = '0.0.2';

const www = http.createServer((req, res) => {
  if ('/favicon.ico' === req.url) {
    res.statusCode = 404;
    res.end();
    return;
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  const envs = JSON.stringify(process.env);
  console.log(`app v.${version} New request from ${req.socket.remoteAddress} at ${new Date().toISOString()}: ${req.method} ${req.url}`);
  res.end(`
Hello from ${req.socket.remoteAddress}\n
Welcome to ${process.env.HOSTNAME} v.${version}\n
Now: ${new Date().toISOString()}\n
ENVs: ${envs}\n
`);
});

www.on('close', () => console.log(`closing server v.${version} at ${new Date().toISOString()}`));
www.listen(8080, '0.0.0.0', () => console.log(`started server v.${version} at ${new Date().toISOString()}`));

// kill self on TERM/INT
process.on('SIGTERM', termSignalHandler);
process.on('SIGINT', termSignalHandler);

async function termSignalHandler(signal) {
  console.log(`server v.${version} received ${signal} at ${new Date().toISOString()}`);
  await util.promisify(www.close);
  process.exit(0);
}
