import { useQuery } from "@realm/react";
import { PreferenceConfig } from "../models/PreferenceConfigModel";
import { UserConfig } from "../models/UserConfigModel";


export function useCurrentUserId() {
    const [preferencesConfig] = useQuery(PreferenceConfig)

    return preferencesConfig?.currentUser;
}

export function useCurrentUser() {
    const currentUserId = useCurrentUser();
    const configs = useQuery(UserConfig);
    const [userConfig] = configs.filtered("_id == $0", currentUserId);

    return userConfig;
}