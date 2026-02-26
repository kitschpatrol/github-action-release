import { defineConfig } from 'rolldown'

export default defineConfig({
	input: 'src/main.ts',
	output: {
		file: 'dist/index.js',
		format: 'cjs',
	},
	target: 'es2022',
	platform: 'node',
	resolve: {
		conditionNames: ['import', 'require', 'node', 'default'],
	},
})
