import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';

const production = !false;

export default {
  input: 'main.ts',
  output: {
    dir: 'output',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    commonjs(),
    typescript({
    sourceMap: !production,
    inlineSources: !production
  }),
  
  production && terser()
  ]
};