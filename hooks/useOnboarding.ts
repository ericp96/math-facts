import { useQuery } from '@realm/react';
import { UserConfig } from '../models/UserConfigModel';
import { OperatorConfig } from '../models/OperatorConfigModel';

export function useNeedsOnboarding() {
  const users = useQuery(UserConfig);
  const operatorConfigs = useQuery(OperatorConfig);
  
  // If there are no users, we need onboarding
  // If there are users but no operator configs, we need onboarding
  return users.length === 0 || operatorConfigs.length === 0;
}