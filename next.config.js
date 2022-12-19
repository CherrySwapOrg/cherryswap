module.exports = {
  concurrentFeatures: true,
  webpack: (config) => {
    config.externals.push({
      sharp: 'commonjs sharp',
    })

    return config
  },
  // This is needed to reduce docker image size
  experimental: {
    outputStandalone: true,
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['content-api.changenow.io'],
  },
}
