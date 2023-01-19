import generalConfig from 'config/general'

interface NumberFormattingConfig {
  decimalSeparator: string
  groupSeparator: string
}

export class ConfigService {
  public static get numberFormattingConfig(): NumberFormattingConfig {
    return {
      decimalSeparator: generalConfig.decimalSeparator,
      groupSeparator: generalConfig.groupSeparator,
    }
  }

  public static get defaultCurrencyIconSize(): number {
    return generalConfig.currencyIconSize
  }
}
