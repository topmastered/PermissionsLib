import Permission from "./lib/Permission";
import PermissionsList from "./lib/PermissionsList";
declare class Permissions {
    private m_list;
    private m_explicit;
    constructor(list: PermissionsList);
    allow(title: string): Promise<Permissions>;
    deny(title: string): Promise<Permissions>;
    default(title: string): Promise<Permissions>;
    has(title: string, options?: {
        tree: boolean;
        limit: number;
    }): Promise<boolean>;
}
export { Permissions, Permission, PermissionsList };
