module.exports = {
  presets: [
	  [
		  "@babel/preset-env",
	  ]
  ],
  plugins: [
  	"@babel/plugin-proposal-optional-chaining",
  	"@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-syntax-jsx",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-json-strings",
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    "@babel/plugin-proposal-function-sent",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-throw-expressions"
  ]
}
