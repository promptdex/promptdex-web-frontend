import { AbilityBuilder, createMongoAbility, MongoAbility } from '@casl/ability';
import { FeatureName, isFeatureEnabled } from './features';

export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete' | 'access' | 'suggest' | 'request-delete' | 'request-update';
export type Subjects = 'all' | 'Dataset' | 'Template' | 'AdminPanel' | FeatureName;

export type AppAbility = MongoAbility<[Actions, Subjects]>;

export enum UserRole {
    Public = 'public',
    Logged = 'logged',
    Admin = 'admin',
}

export function defineAbilitiesFor(role: UserRole = UserRole.Public) {
    const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    // Public permissions
    can('read', 'all');
    
    // Feature-specific access (even for public, if enabled)
    if (isFeatureEnabled(FeatureName.Dataset)) {
        can('access', FeatureName.Dataset);
    }
    
    if (isFeatureEnabled(FeatureName.Template)) {
        can('access', FeatureName.Template);
    }

    if (role === UserRole.Logged) {
        can('suggest', FeatureName.Dataset);
        can('suggest', FeatureName.Template);
        can('request-delete', FeatureName.Dataset);
        can('request-delete', FeatureName.Template);
        can('request-update', FeatureName.Dataset);
        can('request-update', FeatureName.Template);
    }

    if (role === UserRole.Admin) {
        can('manage', 'all');
        can('create', 'all');
        can('update', 'all');
        can('delete', 'all');
        can('access', 'AdminPanel');
    }

    return build();
}
