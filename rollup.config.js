import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from "@rollup/plugin-json"
import nodePolyfills from 'rollup-plugin-polyfill-node';


const production = !false;

export default {
  input: 'src/main.ts',
  external: ["web3"],
  output: [{
    file: 'dist/bundle.js',
    format: 'iife',
    globals: {
      Web3: "Web3"
    }
    //sourcemap: "inline"
  }, {
    file: 'dist/bundle.min.js',
    format: 'iife',
    plugins: [terser()]
  }],
  plugins: [
    commonjs(),
    typescript({
      sourceMap: !production,
      //inlineSources: !production
    }),
  
    resolve({
      browser: true,
      preferBuiltins: false
    }),
  
    json(),
    nodePolyfills(),
  
  ]
};
