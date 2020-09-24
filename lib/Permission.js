export default class Permission {
    constructor(title, allowedByDefault, parents) {
        this.m_title = title;
        this.m_default = allowedByDefault;
        this.m_parents = parents || [];
    }
    get title() {
        return this.m_title;
    }
    get parents() {
        return this.m_parents;
    }
    get default() {
        return this.m_default;
    }
}
