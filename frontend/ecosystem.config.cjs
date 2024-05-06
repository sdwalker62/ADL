module.exports = {
	apps: [
		{
			name: 'athenalib',
			script: 'build/server/index.js',
			env_production: {
				NODE_ENV: 'production',
				PORT: 5173 // port the app will be launched on
			},
			watch: '.'
		}
		// {
		// 	script: './service-worker/',
		// 	watch: ['./service-worker']
		// }
	],

	deploy: {
		production: {
			user: process.env.USER,
			host: process.env.HOST,
			ssh_options: 'StrictHostKeyChecking=no',
			ref: process.env.GIT_BRANCH,
			repo: process.env.GIT_REPOSITORY,
			path: process.env.DEPLOY_PATH,
			'pre-deploy-local': '',
			'post-deploy':
				'cd frontend && npm install && npm run build && pm2 reload ecosystem.config.cjs',
			'pre-setup': ''
		}
	}
};
