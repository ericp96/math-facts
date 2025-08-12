import { useQuery, useRealm } from "@realm/react";
import { PreferenceConfig } from "../models/PreferenceConfigModel";
import { UserConfig } from "../models/UserConfigModel";
import { useCallback } from "react";


export function useCurrentUserId() {
    const [preferencesConfig] = useQuery(PreferenceConfig)

    return preferencesConfig?.currentUser;
}

export function useUpdateCurrentUser() {
    const realm = useRealm();
    const [preferencesConfig] = useQuery(PreferenceConfig)

    const callback = useCallback((userId: Realm.BSON.ObjectId) => {
        realm.write(() => {
            preferencesConfig.currentUser = userId;
        });
    }, [realm]);
    
    return callback;
};

export function useCurrentUser() {
    const currentUserId = useCurrentUserId();
    const configs = useQuery(UserConfig);
    const [userConfig] = configs.filtered("_id == $0", currentUserId);

    return userConfig;
}

export function useGetUsers() {
    const configs = useQuery(UserConfig);

    return configs;
}