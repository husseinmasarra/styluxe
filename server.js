const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'database.json');

function readDb() {
    try {
        if (fs.existsSync(DB_FILE)) {
            return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
        }
    } catch(e){}
    return { products: [], categories: [], brands: [], orders: [], users: [], settings: {} };
}

function writeDb(data) {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
    } catch(e){ console.error('Error writing DB:', e); }
}

const MIME_TYES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

function readBody(req) {
    return new Promise((resolve) => {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try { resolve(body ? JSON.parse(body) : {}); } catch(e){ resolve({}); }
        });
    });
}

function sendJson(res, data, status = 200) {
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const db = readDb();

    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end();
        return;
    }

    if (pathname === '/api/products') {
        if (req.method === 'GET') return sendJson(res, db.products || []);
        if (req.method === 'POST') {
            const body = await readBody(req);
            body.id = Date.now();
            db.products.push(body);
            writeDb(db);
            return sendJson(res, body);
        }
        if (req.method === 'DELETE') {
            const id = parseInt(parsedUrl.query.id);
            db.products = db.products.filter(p => p.id !== id);
            writeDb(db);
            return sendJson(res, { success: true });
        }
    }

    if (pathname === '/api/categories') {
        if (req.method === 'GET') return sendJson(res, db.categories || []);
        if (req.method === 'POST') {
            const body = await readBody(req);
            body.id = Date.now();
            db.categories.push(body);
            writeDb(db);
            return sendJson(res, body);
        }
        if (req.method === 'DELETE') {
            const id = parseInt(parsedUrl.query.id);
            db.categories = db.categories.filter(c => c.id !== id);
            writeDb(db);
            return sendJson(res, { success: true });
        }
    }

    if (pathname === '/api/orders') {
        if (req.method === 'GET') return sendJson(res, db.orders || []);
        if (req.method === 'POST') {
            const body = await readBody(req);
            body.id = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
            body.date = new Date().toISOString().split('T')[0];
            db.orders.push(body);
            writeDb(data);
            return sendJson(res, body);
        }
    }

    let relPath = (pathname === '/' || pathname === '') ? 'index.html' : pathname.replace(/^\//, '');
    let filePath = path.join(__dirname, relPath);

    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
        filePath = path.join(__dirname, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYES[ext] || 'text/html';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': contentType, 'Access-Control-Allow-Origin': '*' });
            res.end(content);
        }
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log('STULUXE Fresh Server listening on port ' + PORT);
});
