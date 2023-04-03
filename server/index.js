import express from 'express';
import { createServer } from 'http';
import Gun from 'gun';

import { handler } from '../build/handler.js';

const port = 8765;
const app = express();

app.use(Gun.serve);

const server = createServer(app);
var gun = Gun({ file: 'data', web: server });

// SvelteKit should handle everything else using Express middleware
// https://github.com/sveltejs/kit/tree/master/packages/adapter-node#custom-server
// app.use(handler);
app.use(handler);

global.Gun = Gun; /// make global to `node --inspect` - debug only
global.gun = gun; /// make global to `node --inspect` - debug only

console.log('Server started on port ' + port + ' with /gun');
server.listen(port, '0.0.0.0');
