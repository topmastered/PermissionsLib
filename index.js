import Permission from "./lib/Permission";
import PermissionsList from "./lib/PermissionsList";
class Permissions {
    constructor(list) {
        this.m_list = list;
    }
    allow(title) {
        return new Promise((resolve, reject) => {
            if (this.m_list.has(title)) {
                this.m_explicit[title] = true;
                resolve(this);
            }
            else {
                reject(`Cannot allow unknown permission: ${title}`);
            }
        });
    }
    deny(title) {
        return new Promise((resolve, reject) => {
            if (this.m_list.has(title)) {
                this.m_explicit[title] = false;
                resolve(this);
            }
            else {
                reject(`Cannot deny unknown permission: ${title}`);
            }
        });
    }
    default(title) {
        return new Promise((resolve, reject) => {
            if (this.m_list.has(title)) {
                delete this.m_explicit[title];
                resolve(this);
            }
            else {
                reject(`Cannot reset default of unknown permission: ${title}`);
            }
        });
    }
    has(title, options = { tree: true, limit: 0 }) {
        return new Promise((resolve, reject) => {
            var _a;
            let check = (t) => {
                var _a;
                if (this.m_list.has(t)) {
                    if (this.m_explicit[t] != undefined) {
                        resolve(this.m_explicit[t]);
                    }
                    else if (((_a = this.m_list.get(t)) === null || _a === void 0 ? void 0 : _a.default) == true) {
                        resolve(true);
                    }
                }
                else {
                    reject(`Missing permission: ${t}`);
                }
            };
            let checkParents = (p, limit) => {
                var _a;
                if (limit != 0) {
                    (_a = this.m_list.get(p)) === null || _a === void 0 ? void 0 : _a.parents.forEach((p2) => {
                        check(p2);
                        checkParents(p2, limit - 1);
                    });
                }
            };
            if (this.m_list.has(title)) {
                check(title);
                if (options.tree) {
                    (_a = this.m_list.get(title)) === null || _a === void 0 ? void 0 : _a.parents.forEach((p) => {
                        check(p);
                        checkParents(p, options.limit - 1);
                    });
                }
                resolve(false);
            }
        });
    }
}
export { Permissions, Permission, PermissionsList };
