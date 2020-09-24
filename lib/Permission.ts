export default class Permission {
    private m_title: string;
    private m_parents: string[];
    private m_default: boolean;

    constructor(title: string, allowedByDefault: boolean, parents?: string[]) {
        this.m_title = title;
        this.m_default = allowedByDefault;
        this.m_parents = parents || [];
    }

    get title(): string {
        return this.m_title;
    }

    get parents(): string[] {
        return this.m_parents;
    }

    get default(): boolean {
        return this.m_default;
    }
}
