module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:5000/api/:path*/',
        },
      ]
    },
  }
  // what the literal fuck, it has to end in a slash??????????