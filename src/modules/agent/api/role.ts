import { ROLES } from 'src/API';

export const getAgentRoleLabel = (role: ROLES): string => {
  let label = '';

  switch (role) {
    case ROLES.Director:
      label = 'Direktor';
      break;
    case ROLES.OfficeManager:
      label = 'Office Mitarbeiter';
      break;
    case ROLES.AgentLR2:
      label = 'Leitender Repräsentant II';
      break;
    case ROLES.AgentLR1:
      label = 'Leitender Repräsentant I';
      break;
    case ROLES.AgentR:
      label = 'Repräsentant';
      break;
    case ROLES.FinancialAdvisor:
      label = 'Finanzierungsberater';
      break;
    case ROLES.InsuranceAdvisor:
      label = 'Versicherungsberater';
      break;
  }

  return label;
};

export const AGENT_ROLES = [
  ROLES.Director,
  ROLES.AgentLR2,
  ROLES.AgentLR1,
  ROLES.AgentR,
  ROLES.OfficeManager,
  ROLES.FinancialAdvisor,
  ROLES.InsuranceAdvisor,
];
