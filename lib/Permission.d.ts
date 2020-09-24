export default class Permission {
    private m_title;
    private m_parents;
    private m_default;
    constructor(title: string, allowedByDefault: boolean, parents?: string[]);
    get title(): string;
    get parents(): string[];
    get default(): boolean;
}
