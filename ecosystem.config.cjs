module.exports = {
    apps: [
            {
                name: 'twky-web',
                cwd: '/home/forge/theywillkillyou.com',
                script: 'node_modules/.bin/next',
                args: 'start -p 3000',
                env: { NODE_ENV: 'production' }
            },
            {
                name: 'twky-web-test',
                cwd: '/home/forge/test.theywillkillyou.com',
                script: 'node_modules/.bin/next',
                args: 'start -p 3001',
                env: { NODE_ENV: 'production' }
            }
    ]
};
