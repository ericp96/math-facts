export type OperatorSettingProps = {
  enabled: boolean;
  config: any;
  update: (enabled: boolean, config: any) => void;
};
