const path = require('node:path')

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  webpack: {
    alias: {
      '@': resolve('src'),
    },
  },
}
