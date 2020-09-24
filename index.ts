import Permission from "./lib/Permission";
import PermissionsList from "./lib/PermissionsList";

class Permissions {
    private m_list: PermissionsList;
    private m_explicit: any;

    constructor(list: PermissionsList) {
        this.m_list = list;
    }

    public allow(title: string): Promise<Permissions> {
        return new Promise((resolve, reject) => {
            if (this.m_list.has(title)) {
                this.m_explicit[title] = true;
                resolve(this);
            } else {
                reject(`Cannot allow unknown permission: ${title}`);
            }
        });
    }

    public deny(title: string): Promise<Permissions> {
        return new Promise((resolve, reject) => {
            if (this.m_list.has(title)) {
                this.m_explicit[title] = false;
                resolve(this);
            } else {
                reject(`Cannot deny unknown permission: ${title}`);
            }
        });
    }

    public default(title: string): Promise<Permissions> {
        return new Promise((resolve, reject) => {
            if (this.m_list.has(title)) {
                delete this.m_explicit[title];
                resolve(this);
            } else {
                reject(`Cannot reset default of unknown permission: ${title}`);
            }
        });
    }

    public has(title: string, options: { tree: boolean; limit: number } = { tree: true, limit: 0 }): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let check = (t: string) => {
                if (this.m_list.has(t)) {
                    if (this.m_explicit[t] != undefined) {
                        resolve(this.m_explicit[t]);
                    } else if (this.m_list.get(t)?.default == true) {
                        resolve(true);
                    }
                } else {
                    reject(`Missing permission: ${t}`);
                }
            };
            let checkParents = (p: string, limit: number) => {
                if (limit != 0) {
                    this.m_list.get(p)?.parents.forEach((p2) => {
                        check(p2);
                        checkParents(p2, limit - 1);
                    });
                }
            };
            if (this.m_list.has(title)) {
                check(title);
                if (options.tree) {
                    this.m_list.get(title)?.parents.forEach((p: string) => {
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
