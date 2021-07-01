import { SpecifiedField } from 'jexity-app/form/fields/fieldApi';

export const investmentKompassDocSchema: SpecifiedField[] = [
  // 3rd Page
  {
    type: 'stringFormField',
    name: 'grossSalary',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'workingYears',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'amountOfPension',
    isRequired: false,
  },
  {
    type: 'stringFormField',
    name: 'incomeConcept',
    isRequired: false,
  },
  // End of 3rd Page

  // 4th Page
  {
    type: 'radioFormField',
    name: 'ownProperty',
    isRequired: true,
    options: [
      { key: '1', label: '1', value: '1' },
      { key: '2', label: '2', value: '2' },
      { key: '3', label: '3', value: '3' },
      { key: '4', label: '4', value: '4' },
      { key: '5', label: '5', value: '5' },
      { key: '6', label: '6', value: '6' },
      { key: '7', label: '7', value: '7' },
    ],
  },
  {
    type: 'radioFormField',
    name: 'safeFuture',
    isRequired: true,
    options: [
      { key: '1', label: '1', value: '1' },
      { key: '2', label: '2', value: '2' },
      { key: '3', label: '3', value: '3' },
      { key: '4', label: '4', value: '4' },
      { key: '5', label: '5', value: '5' },
      { key: '6', label: '6', value: '6' },
      { key: '7', label: '7', value: '7' },
    ],
  },
  {
    type: 'radioFormField',
    name: 'financialIndependence',
    isRequired: true,
    options: [
      { key: '1', label: '1', value: '1' },
      { key: '2', label: '2', value: '2' },
      { key: '3', label: '3', value: '3' },
      { key: '4', label: '4', value: '4' },
      { key: '5', label: '5', value: '5' },
      { key: '6', label: '6', value: '6' },
      { key: '7', label: '7', value: '7' },
    ],
  },
  {
    type: 'radioFormField',
    name: 'retirementSecure',
    isRequired: true,
    options: [
      { key: '1', label: '1', value: '1' },
      { key: '2', label: '2', value: '2' },
      { key: '3', label: '3', value: '3' },
      { key: '4', label: '4', value: '4' },
      { key: '5', label: '5', value: '5' },
      { key: '6', label: '6', value: '6' },
      { key: '7', label: '7', value: '7' },
    ],
  },
  {
    type: 'radioFormField',
    name: 'optimalSecurity',
    isRequired: true,
    options: [
      { key: '1', label: '1', value: '1' },
      { key: '2', label: '2', value: '2' },
      { key: '3', label: '3', value: '3' },
      { key: '4', label: '4', value: '4' },
      { key: '5', label: '5', value: '5' },
      { key: '6', label: '6', value: '6' },
      { key: '7', label: '7', value: '7' },
    ],
  },
  {
    type: 'radioFormField',
    name: 'otherWishes',
    isRequired: true,
    options: [
      { key: '1', label: '1', value: '1' },
      { key: '2', label: '2', value: '2' },
      { key: '3', label: '3', value: '3' },
      { key: '4', label: '4', value: '4' },
      { key: '5', label: '5', value: '5' },
      { key: '6', label: '6', value: '6' },
      { key: '7', label: '7', value: '7' },
    ],
  },
  // End of 4th Page

  // 5th Page
  {
    type: 'stringFormField',
    name: 'salaryBenefitRentPension',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'totalRevenue',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'totalFixedExpenses',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'totalSavings',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'variableSpendingBudget',
    isRequired: true,
  },
  /**
   * Wealth table schema
   */
  {
    type: 'currencyFormField',
    name: 'netManYear',
  },
  {
    type: 'currencyFormField',
    name: 'netManMonth',
  },
  {
    type: 'currencyFormField',
    name: 'netWomanYear',
  },
  {
    type: 'currencyFormField',
    name: 'netWomanMonth',
  },
  {
    type: 'currencyFormField',
    name: 'partTimeJobYear',
  },
  {
    type: 'currencyFormField',
    name: 'partTimeJobMonth',
  },
  {
    type: 'currencyFormField',
    name: 'rentalIncomeYear',
  },
  {
    type: 'currencyFormField',
    name: 'rentalIncomeMonth',
  },
  {
    type: 'currencyFormField',
    name: 'childBenefitYear',
  },
  {
    type: 'currencyFormField',
    name: 'childBenefitMonth',
  },
  {
    type: 'stringFormField',
    name: 'revenueOther',
  },
  {
    type: 'currencyFormField',
    name: 'revenueOtherYear',
  },
  {
    type: 'currencyFormField',
    name: 'revenueOtherMonth',
  },
  {
    type: 'currencyFormField',
    name: 'realEstateLoanYear',
  },
  {
    type: 'currencyFormField',
    name: 'realEstateLoanMonth',
  },
  {
    type: 'currencyFormField',
    name: 'installmentLoanYear',
  },
  {
    type: 'currencyFormField',
    name: 'installmentLoanMonth',
  },
  {
    type: 'currencyFormField',
    name: 'carLoanYear',
  },
  {
    type: 'currencyFormField',
    name: 'carLoanMonth',
  },
  {
    type: 'currencyFormField',
    name: 'privateLiabilityYear',
  },
  {
    type: 'currencyFormField',
    name: 'privateLiabilityMonth',
  },
  {
    type: 'currencyFormField',
    name: 'houseHoldContentYear',
  },
  {
    type: 'currencyFormField',
    name: 'houseHoldContentMonth',
  },
  {
    type: 'currencyFormField',
    name: 'carInsuranceYear',
  },
  {
    type: 'currencyFormField',
    name: 'carInsuranceMonth',
  },
  {
    type: 'currencyFormField',
    name: 'accidentInsuranceYear',
  },
  {
    type: 'currencyFormField',
    name: 'accidentInsuranceMonth',
  },
  {
    type: 'currencyFormField',
    name: 'disabilityInsuranceYear',
  },
  {
    type: 'currencyFormField',
    name: 'disabilityInsuranceMonth',
  },
  {
    type: 'currencyFormField',
    name: 'termLifeInsuranceYear',
  },
  {
    type: 'currencyFormField',
    name: 'termLifeInsuranceMonth',
  },
  {
    type: 'stringFormField',
    name: 'fixedExpensesOther',
  },
  {
    type: 'currencyFormField',
    name: 'fixedExpensesYear',
  },
  {
    type: 'currencyFormField',
    name: 'fixedExpensesMonth',
  },

  {
    type: 'currencyFormField',
    name: 'lifeInsuranceYear',
  },
  {
    type: 'currencyFormField',
    name: 'lifeInsuranceMonth',
  },
  {
    type: 'currencyFormField',
    name: 'securitiesYear',
  },
  {
    type: 'currencyFormField',
    name: 'securitiesMonth',
  },
  {
    type: 'currencyFormField',
    name: 'homeLoanSavingsYear',
  },
  {
    type: 'currencyFormField',
    name: 'homeLoanSavingsMonth',
  },
  {
    type: 'stringFormField',
    name: 'savingsOther',
  },
  {
    type: 'currencyFormField',
    name: 'savingsOtherYear',
  },
  {
    type: 'currencyFormField',
    name: 'savingsOtherMonth',
  },
  {
    type: 'multilineStringFormField',
    name: 'wealthConceptNotes',
    multirow: true,
  },
  // End of 5th Page

  // 7th Page
  {
    type: 'stringFormField',
    name: 'whichConsultantsOrInvesment',
  },
  {
    type: 'radioFormField',
    name: 'investingAspects',
    isRequired: true,
    options: [
      { key: '1', label: 'rentabel', value: 'rentabel' },
      { key: '2', label: 'rentabel-sicher', value: 'rentabel-sicher' },
      { key: '3', label: 'sicher', value: 'sicher' },
      { key: '4', label: 'sicher-liquide', value: 'sicher-liquide' },
      { key: '5', label: 'liquide', value: 'liquide' },
      { key: '6', label: 'liquide-rentabel', value: 'liquide-rentabel' },
      { key: '7', label: 'balance', value: 'balance' },
    ],
  },
  {
    type: 'radioFormField',
    name: 'VLHomeLoanSavings',
    isRequired: true,
    options: [
      { key: '1', label: 'Ja', value: 'Yes' },
      { key: '2', label: 'Nein', value: 'No' },
    ],
  },
  {
    type: 'currencyFormField',
    name: 'VLHomeLoanSavingsAmount',
  },
  {
    type: 'radioFormField',
    name: 'VLFundSavings',
    isRequired: true,
    options: [
      { key: '1', label: 'Ja', value: 'Yes' },
      { key: '2', label: 'Nein', value: 'No' },
    ],
  },
  {
    type: 'currencyFormField',
    name: 'VLFundSavingsAmount',
  },
  {
    type: 'radioFormField',
    name: 'riesterPension',
    isRequired: true,
    options: [
      { key: '1', label: 'Ja', value: 'Yes' },
      { key: '2', label: 'Nein', value: 'No' },
    ],
  },
  {
    type: 'currencyFormField',
    name: 'riesterPensionAmount',
  },
  {
    type: 'radioFormField',
    name: 'blackPension',
    isRequired: true,
    options: [
      { key: '1', label: 'Ja', value: 'Yes' },
      { key: '2', label: 'Nein', value: 'No' },
    ],
  },
  {
    type: 'currencyFormField',
    name: 'blackPensionAmount',
  },
  {
    type: 'radioFormField',
    name: 'employerFundedPension',
    isRequired: true,
    options: [
      { key: '1', label: 'Ja', value: 'Yes' },
      { key: '2', label: 'Nein', value: 'No' },
    ],
  },
  {
    type: 'currencyFormField',
    name: 'employerFundedPensionAmount',
  },
  {
    type: 'radioFormField',
    name: 'taxStateGrantsAdvice',
    isRequired: true,
    options: [
      { key: '1', label: 'Ja', value: 'Yes' },
      { key: '2', label: 'Nein', value: 'No' },
    ],
  },
  {
    type: 'radioFormField',
    name: 'investingChildBenefit',
    isRequired: true,
    options: [
      { key: '1', label: 'Ja', value: 'Yes' },
      { key: '2', label: 'Nein', value: 'No' },
    ],
  },
  {
    type: 'stringFormField',
    name: 'investingChildBenefitAmount',
  },
  {
    type: 'radioFormField',
    name: 'willingForChildren',
    options: [
      { key: '1', label: 'Ja', value: 'Yes' },
      { key: '2', label: 'Nein', value: 'No' },
    ],
  },
  {
    type: 'stringFormField',
    name: 'willingAmountForChildren',
  },
  // End of 7th Page

  // 8th Page
  {
    type: 'radioFormField',
    name: 'incomeSecurityImportant',
    isRequired: true,
    options: [
      { key: '1', label: 'Ja', value: 'Yes' },
      { key: '2', label: 'Nein', value: 'No' },
    ],
  },
  {
    type: 'stringFormField',
    name: 'occupationalDisabilityAmmount',
  },
  {
    type: 'radioFormField',
    name: 'ownPropertyExists',
    isRequired: true,
    options: [
      { key: '1', label: 'Ja, seit', value: 'Yes' },
      { key: '2', label: 'Nein', value: 'No' },
    ],
  },
  {
    type: 'stringFormField',
    name: 'ownPropertySince',
  },
  {
    type: 'stringFormField',
    name: 'ownPropertyValueApprox',
  },
  {
    type: 'stringFormField',
    name: 'ownPropertyLivingSpace',
  },
  {
    type: 'stringFormField',
    name: 'ownPropertyColdRent',
  },
  {
    type: 'stringFormField',
    name: 'ownPropertyAdditionalCost',
  },
  {
    type: 'radioFormField',
    name: 'ownPropertyType',
    isRequired: true,
    options: [
      { key: '1', label: 'Selbstnutzung', value: 'Selbstnutzung' },
      { key: '2', label: 'Vermietung', value: 'Vermietung' },
    ],
  },
  {
    type: 'radioFormField',
    name: 'ownPropertyUsageType',
    isRequired: true,
    options: [
      { key: '1', label: 'ETW', value: 'ETW' },
      { key: '2', label: 'EFH', value: 'EFH' },
      { key: '3', label: 'DHH', value: 'DHH' },
      { key: '3', label: 'RHH', value: 'RHH' },
    ],
  },
  {
    type: 'radioFormField',
    name: 'shortenFinancingPhase',
    isRequired: true,
    options: [
      { key: '1', label: 'Ja', value: 'Yes' },
      { key: '2', label: 'Nein', value: 'No' },
    ],
  },
  {
    type: 'radioFormField',
    name: 'payOffSelfProperty',
    isRequired: true,
    options: [
      { key: '1', label: 'Ja', value: 'Yes' },
      { key: '2', label: 'Nein', value: 'No' },
    ],
  },
  {
    type: 'stringFormField',
    name: 'monthlyBudget',
  },
  // End of 8th Page

  // 9th Page
  {
    type: 'stringFormField',
    name: 'personalDataName1',
  },
  {
    type: 'dateFormField',
    name: 'personalDataBirthDate1',
  },
  {
    type: 'stringFormField',
    name: 'personalDataPlaceOfBirthDate1',
  },
  {
    type: 'selectFormField',
    name: 'personalDataMaritalStatus1',
    options: [
      {
        type: 'formStringOption',
        key: 'ledig',
        value: 'ledig',
        label: 'Ledig',
      },
      {
        type: 'formStringOption',
        key: 'verlobt',
        value: 'verlobt',
        label: 'Verlobt',
      },
      {
        type: 'formStringOption',
        key: 'verheiratet',
        value: 'verheiratet',
        label: 'Verheiratet',
      },
      {
        type: 'formStringOption',
        key: 'geschieden',
        value: 'geschieden',
        label: 'Geschieden',
      },
      {
        type: 'formStringOption',
        key: 'verwitwet',
        value: 'verwitwet',
        label: 'Verwitwet',
      },
    ],
  },
  {
    type: 'stringFormField',
    name: 'personalDataNationality1',
  },
  {
    type: 'stringFormField',
    name: 'personalDataTaxID1',
  },
  {
    type: 'stringFormField',
    name: 'streetHouseNumber',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'sinceDate',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'privateTelephone',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'privateTelefax',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'mobilePhone',
    isRequired: true,
  },
  {
    type: 'emailFormField',
    name: 'email',
    isRequired: true,
  },
  {
    type: 'signatureFormField',
    name: 'signatureClient',
    isRequired: true,
  },
  {
    type: 'signatureFormField',
    name: 'signatureClien2',
    isRequired: true,
  },
  {
    type: 'signatureFormField',
    name: 'signatureAgent',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'placeAndDate',
    isRequired: true,
  },
  // End of 9th Page

  // 10th Page
  {
    type: 'checkboxFormField',
    name: 'IDcopies',
  },
  {
    type: 'checkboxFormField',
    name: 'spousesPaySlips',
  },
  {
    type: 'checkboxFormField',
    name: 'additionalIncome',
  },
  {
    type: 'checkboxFormField',
    name: 'pensionInfo',
  },
  {
    type: 'checkboxFormField',
    name: 'requiredHomeLoanSavings',
  },
  {
    type: 'checkboxFormField',
    name: 'lifePensionInsurance',
  },
  {
    type: 'checkboxFormField',
    name: 'requiredSecurities',
  },
  {
    type: 'checkboxFormField',
    name: 'otherContracts',
  },
  {
    type: 'checkboxFormField',
    name: 'monthlyRentLoan',
  },
  {
    type: 'checkboxFormField',
    name: 'loanAgreement',
  },
  {
    type: 'checkboxFormField',
    name: 'propertyInsurance',
  },
  {
    type: 'checkboxFormField',
    name: 'personalInsurance',
  },
  {
    type: 'checkboxFormField',
    name: 'householdCosts',
  },
  {
    type: 'checkboxFormField',
    name: 'clubFees',
  },
  {
    type: 'checkboxFormField',
    name: 'bankStatementLast3Months',
  },
  {
    type: 'checkboxFormField',
    name: 'currentBWA',
  },
  {
    type: 'checkboxFormField',
    name: 'lastTaxAssessment',
  },
  {
    type: 'checkboxFormField',
    name: 'rentalAgreements',
  },
];
