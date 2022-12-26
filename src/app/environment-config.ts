import * as process from 'process'

class EnvironmentConfig {
  public static get env(): string {
    return String(process.env.NODE_ENV).toLowerCase().trim()
  }

  public static get contentApiUrl(): string {
    return String(process.env.NEXT_PUBLIC_CONTENT_API_URL).trim()
  }

  public static get changeNowApiKey(): string {
    return String(process.env.CHANGE_NOW_API_KEY).trim()
  }

  public static get changeNowApiUrl(): string {
    return String(process.env.CHANGE_NOW_API_URL).trim()
  }
}

export default EnvironmentConfig
