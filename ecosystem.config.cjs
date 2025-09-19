module.exports = {
    apps: [
        {
            name: 'twky-web',
            cwd: '/home/forge/theywillkillyou.com',
            script: 'node_modules/next/dist/bin/next',
            args: 'start -p 3000',
            env: { NODE_ENV: 'production' }
        }
    ]
};
