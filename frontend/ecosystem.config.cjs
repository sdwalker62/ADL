module.exports = {
	apps: [
		{
			name: 'athenalib',
			script: 'build/server/index.js',
			watch: '.'
		}
		// {
		// 	script: './service-worker/',
		// 	watch: ['./service-worker']
		// }
	],

	deploy: {
		production: {
			user: 'root',
			host: '143.244.223.112',
			ssh_options: 'StrictHostKeyChecking=no',
			ref: 'origin/master',
			repo: process.env.GIT_REPOSITORY,
			path: process.env.DEPLOY_PATH,
			'pre-deploy-local': '',
			'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.cjs',
			'pre-setup': ''
		}
	}
};
