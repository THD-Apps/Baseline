export const customTheme = {
	name: 'custom-theme',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-family-heading': `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '6px',
		'--theme-rounded-container': '6px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '0 0 0',
		'--on-secondary': '0 0 0',
		'--on-tertiary': '255 255 255',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '0 0 0',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #f09800
		'--color-primary-50': '253 240 217', // #fdf0d9
		'--color-primary-100': '252 234 204', // #fceacc
		'--color-primary-200': '251 229 191', // #fbe5bf
		'--color-primary-300': '249 214 153', // #f9d699
		'--color-primary-400': '245 183 77', // #f5b74d
		'--color-primary-500': '240 152 0', // #f09800
		'--color-primary-600': '216 137 0', // #d88900
		'--color-primary-700': '180 114 0', // #b47200
		'--color-primary-800': '144 91 0', // #905b00
		'--color-primary-900': '118 74 0', // #764a00
		// secondary | #1eaea5
		'--color-secondary-50': '221 243 242', // #ddf3f2
		'--color-secondary-100': '210 239 237', // #d2efed
		'--color-secondary-200': '199 235 233', // #c7ebe9
		'--color-secondary-300': '165 223 219', // #a5dfdb
		'--color-secondary-400': '98 198 192', // #62c6c0
		'--color-secondary-500': '30 174 165', // #1eaea5
		'--color-secondary-600': '27 157 149', // #1b9d95
		'--color-secondary-700': '23 131 124', // #17837c
		'--color-secondary-800': '18 104 99', // #126863
		'--color-secondary-900': '15 85 81', // #0f5551
		// tertiary | #8a1bc5
		'--color-tertiary-50': '237 221 246', // #edddf6
		'--color-tertiary-100': '232 209 243', // #e8d1f3
		'--color-tertiary-200': '226 198 241', // #e2c6f1
		'--color-tertiary-300': '208 164 232', // #d0a4e8
		'--color-tertiary-400': '173 95 214', // #ad5fd6
		'--color-tertiary-500': '138 27 197', // #8a1bc5
		'--color-tertiary-600': '124 24 177', // #7c18b1
		'--color-tertiary-700': '104 20 148', // #681494
		'--color-tertiary-800': '83 16 118', // #531076
		'--color-tertiary-900': '68 13 97', // #440d61
		// success | #c1dd97
		'--color-success-50': '246 250 239', // #f6faef
		'--color-success-100': '243 248 234', // #f3f8ea
		'--color-success-200': '240 247 229', // #f0f7e5
		'--color-success-300': '230 241 213', // #e6f1d5
		'--color-success-400': '212 231 182', // #d4e7b6
		'--color-success-500': '193 221 151', // #c1dd97
		'--color-success-600': '174 199 136', // #aec788
		'--color-success-700': '145 166 113', // #91a671
		'--color-success-800': '116 133 91', // #74855b
		'--color-success-900': '95 108 74', // #5f6c4a
		// warning | #e4c25e
		'--color-warning-50': '251 246 231', // #fbf6e7
		'--color-warning-100': '250 243 223', // #faf3df
		'--color-warning-200': '248 240 215', // #f8f0d7
		'--color-warning-300': '244 231 191', // #f4e7bf
		'--color-warning-400': '236 212 142', // #ecd48e
		'--color-warning-500': '228 194 94', // #e4c25e
		'--color-warning-600': '205 175 85', // #cdaf55
		'--color-warning-700': '171 146 71', // #ab9247
		'--color-warning-800': '137 116 56', // #897438
		'--color-warning-900': '112 95 46', // #705f2e
		// error | #d27f81
		'--color-error-50': '248 236 236', // #f8ecec
		'--color-error-100': '246 229 230', // #f6e5e6
		'--color-error-200': '244 223 224', // #f4dfe0
		'--color-error-300': '237 204 205', // #edcccd
		'--color-error-400': '224 165 167', // #e0a5a7
		'--color-error-500': '210 127 129', // #d27f81
		'--color-error-600': '189 114 116', // #bd7274
		'--color-error-700': '158 95 97', // #9e5f61
		'--color-error-800': '126 76 77', // #7e4c4d
		'--color-error-900': '103 62 63', // #673e3f
		// surface | #1670cc
		'--color-surface-50': '220 234 247', // #dceaf7
		'--color-surface-100': '208 226 245', // #d0e2f5
		'--color-surface-200': '197 219 242', // #c5dbf2
		'--color-surface-300': '162 198 235', // #a2c6eb
		'--color-surface-400': '92 155 219', // #5c9bdb
		'--color-surface-500': '22 112 204', // #1670cc
		'--color-surface-600': '20 101 184', // #1465b8
		'--color-surface-700': '17 84 153', // #115499
		'--color-surface-800': '13 67 122', // #0d437a
		'--color-surface-900': '11 55 100' // #0b3764
	}
};
