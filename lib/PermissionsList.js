export default class PermissionsList {
    constructor() {
        this.permissions = [];
    }
    add(permission) {
        permission.parents.forEach((parent) => {
            if (!this.has(parent)) {
                throw new Error(`Child ${permission.title} import before parent ${parent}`);
            }
        });
        this.permissions.push(permission);
        return this;
    }
    has(title) {
        return this.permissions.filter((perm) => perm.title === title).length === 1;
    }
    delete(title) {
        if (this.permissions.filter((perm) => perm.title === title).length === 0) {
            this.permissions = this.permissions.filter((perm) => perm.title === title);
            return true;
        }
        else {
            return false;
        }
    }
    get(title) {
        if (this.has(title)) {
            return this.permissions.filter((perm) => perm.title === title)[0];
        }
        else {
            return undefined;
        }
    }
}
