import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';

export default {
  input: './build/module/index.js',
  output: {
    file: './build/amd/formula-values.js',
    format: 'amd',
    name: 'FormulaValues'
  },
  treeshake: false,
  plugins: [
    resolve(),
    commonJS({
      include: [
        'node_modules/dayjs/dayjs.min.js',
        'node_modules/dayjs/plugin/advancedFormat.js',
        'node_modules/dayjs/plugin/utc.js',
        'node_modules/lodash/lodash.js',
      ]
    })
  ]
};