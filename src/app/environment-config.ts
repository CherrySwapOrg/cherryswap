import * as process from 'process'

class EnvironmentConfig {
  public static get env(): string {
    process.stdout.write(`
      EnvironmentConfig.env: ${process.env.NODE_ENV}
      `)

    return String(process.env.NODE_ENV).toLowerCase().trim()
  }

  public static get contentApiUrl(): string {
    process.stdout.write(`
      EnvironmentConfig.contentApiUrl: ${process.env.NEXT_PUBLIC_CONTENT_API_URL}
      `)

    return String(process.env.NEXT_PUBLIC_CONTENT_API_URL).trim()
  }

  public static get changeNowApiKey(): string {
    process.stdout.write(`
      EnvironmentConfig.changeNowApiKey: ${process.env.CHANGE_NOW_API_KEY}
      `)

    return String(process.env.CHANGE_NOW_API_KEY).trim()
  }

  public static get changeNowApiUrl(): string {
    process.stdout.write(`
      EnvironmentConfig.changeNowApiUrl: ${process.env.CHANGE_NOW_API_URL}
      `)

    return String(process.env.CHANGE_NOW_API_URL).trim()
  }

  public static get changeNowExchangeStatusApiUrl(): string {
    process.stdout.write(`
      EnvironmentConfig.changeNowExchangeStatusApiUrl: ${process.env.CHANGE_NOW_EXCHANGE_STATUS_API}
      `)

    return String(process.env.CHANGE_NOW_EXCHANGE_STATUS_API).trim()
  }
}

export default EnvironmentConfig
