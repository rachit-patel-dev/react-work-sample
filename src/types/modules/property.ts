export interface IProperty {
    _id: string;
    image: object;
    name: string;
    propertyType: string;
    loanAmount: number;
    termPeriod: string;
    ltv: number;
    return: number;
}

export interface IpropertyStatistics {
    loanManaged: number,
    averageLtv: number,
    avgAnnualRateOfReturn: number
}

export type PropertyList = IProperty[]
