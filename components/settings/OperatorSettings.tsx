import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

import { View } from "../../components/library/Themed";
import { useCallback, useMemo } from "react";
import { useQuery, useRealm } from "@realm/react";
import { router } from "expo-router";
import OperatorAdditionSettings from "./OperatorAdditionSettings";
import OperatorSubtractionSettings from "./OperatorSubtractionSettings";
import OperatorMultiplicationSettings from "./OperatorMultiplicationSettings";
import OperatorDivisionSettings from "./OperatorDivisionSettings";
import { OperatorConfig } from "../../models/OperatorConfigModel";
import { Operator } from "../../constants/Enum";
import { BSON } from "realm";
import { OperatorDefaults } from "../../constants/ConfigDefaults";

function getComponent(operator: Operator) {
  switch (operator) {
    case Operator.Addition:
      return OperatorAdditionSettings;
    case Operator.Multiplication:
      return OperatorMultiplicationSettings;
    case Operator.Subtraction:
      return OperatorSubtractionSettings;
    case Operator.Division:
      return OperatorDivisionSettings;
  }
}

export default function OperatorSettings({ operator }: { operator: Operator }) {
  const realm = useRealm();
  const operatorConfigs = useQuery(OperatorConfig);
  const [operatorConfig] =
    operatorConfigs.filtered("$0 == operator", operator) || [];
  const { config, enabled } = operatorConfig || {};

  const Component = useMemo(() => getComponent(operator), [operator]);
  const configWithDefaults = useMemo(() => ({...OperatorDefaults[operator], ...config}), [operator, config])

  const updateSettings = useCallback(
    (enabled: boolean, config: any) => {
      if (operatorConfig != null) {
        realm.write(() => {
          operatorConfig.enabled = enabled;
          Object.entries(config).forEach(([k, v]) =>
            // @ts-ignore
            operatorConfig.config.set(k, v)
          );
          operatorConfig.config = config;
        });
      } else {
        realm.write(() => {
          realm.create("OperatorConfig", {
            _id: new BSON.ObjectID(),
            enabled,
            config,
            operator,
          });
        });
      }
      router.back();
    },
    [realm, operatorConfig]
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Component enabled={enabled} config={configWithDefaults} update={updateSettings} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  label: {
    margin: 10,
    marginBottom: 0,
    fontWeight: "bold",
  },
  textBox: {
    borderWidth: 1,
    borderColor: "#eee",
    padding: 10,
    margin: 10,
  },
  userInfoWrapper: {
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    borderColor: "#b2cdf7",
  },
  userInfoName: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
