import Permission from "./Permission";

export default class PermissionsList {
    private permissions: Permission[] = [];

    public add(permission: Permission): PermissionsList {
        permission.parents.forEach((parent) => {
            if (!this.has(parent)) {
                throw new Error(`Child ${permission.title} import before parent ${parent}`);
            }
        });
        this.permissions.push(permission);
        return this;
    }

    public has(title: string): boolean {
        return this.permissions.filter((perm) => perm.title === title).length === 1;
    }

    public delete(title: string): boolean {
        if (this.permissions.filter((perm) => perm.title === title).length === 0) {
            this.permissions = this.permissions.filter((perm) => perm.title === title);
            return true;
        } else {
            return false;
        }
    }

    public get(title: string): Permission | undefined {
        if (this.has(title)) {
            return this.permissions.filter((perm) => perm.title === title)[0];
        } else {
            return undefined;
        }
    }
}
