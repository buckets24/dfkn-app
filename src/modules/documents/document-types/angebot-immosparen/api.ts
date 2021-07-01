export interface OneTimeInvestmentType {
  year: any;
  investmentAmount?: number;
  interestPerYear?: number;
  taxDeduction?: number;
  totalProfit?: number;
  credit?: number;
}

export interface InstallmentInvestmentType {
  year?: any;
  paymentPerYear?: number;
  capital?: number;
  interestPerYear?: number;
  taxDeduction?: number;
  totalProfit?: number;
  balance?: number;
}
