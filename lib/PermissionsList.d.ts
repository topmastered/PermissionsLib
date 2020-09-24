import Permission from "./Permission";
export default class PermissionsList {
    private permissions;
    add(permission: Permission): PermissionsList;
    has(title: string): boolean;
    delete(title: string): boolean;
    get(title: string): Permission | undefined;
}
