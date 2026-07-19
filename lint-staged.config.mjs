const lintStagedConfig = {
  '*.{js,jsx,ts,tsx,mjs,cjs}': ['eslint --fix', 'prettier --write'],
  '*.{json,md,mdx,css,scss,yaml,yml}': ['prettier --write'],
}

export default lintStagedConfig
