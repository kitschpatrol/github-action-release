import { prettierConfig } from '@kitschpatrol/prettier-config'

export default prettierConfig({
	overrides: [
		{
			files: ['src/*', 'vitest.config.ts', '__tests__/*', 'package.json'],
			options: {
				// Matches upstream...
				trailingComma: 'all',
				tabWidth: 2,
				semi: true,
				singleQuote: true,
				printWidth: 100,
				bracketSpacing: true,
				// Override shared config:
				useTabs: false,
				// embeddedLanguageFormatting: 'auto',
				// objectWrap: 'preserve',
			},
		},
	],
})
