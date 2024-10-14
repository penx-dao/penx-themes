import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  treeshake: true,
  splitting: true,
  sourcemap: true,
  // clean: true,
})

// import { defineConfig } from 'tsup'

// export default defineConfig({
//   entry: [
//     'src/externals/index.tsx',
//     'src/externals/HomePage.tsx',
//     'src/externals/PostDetailLayout.tsx',
//   ],
//   format: 'esm',
//   dts: true,
//   clean: true,
//   name: 'plantree-theme-simple',
//   outExtension: () => ({ js: '.js' }),
// })
