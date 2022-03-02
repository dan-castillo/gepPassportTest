const BACKEND_URL = process.env.BACKEND_URL || 'localhost';
const BACKEND_PORT = process.env.BACKEND_PORT || '8000';

const PROXY_CONFIG = {
    '/api/*': {
        target: `http://localhost:8003`,
        pathRewrite: {
            '^/api/web': '/web',
            '^/api/mobile': '/mobile'
        },
        changeOrigin: true,
        logLevel: 'debug'
    }
};


module.exports = PROXY_CONFIG;