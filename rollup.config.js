import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';


const production = !false;

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/main.js',
    format: 'iife',
    sourcemap: "inline"
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
