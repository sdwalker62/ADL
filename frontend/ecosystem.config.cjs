module.exports = {
	apps: [
		{
			name: 'athenalib',
			script: 'build/index.js',
			env: {
				PORT: 4173
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
			'post-deploy': 'sh frontend/scripts/startup.sh',
			'pre-setup': ''
		}
	}
};
