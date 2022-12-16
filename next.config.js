module.exports = {
  concurrentFeatures: true,
  webpack: (config) => {
    config.externals.push({
      sharp: 'commonjs sharp',
    })

    return config
  },
  // This is needed for reduce docker image size
  experimental: {
    outputStandalone: true,
  },
}
