export class CustomMenuItem {
    constructor() {
        this.Label = null;
        this.Icon = null;
        this.RouterLink = null;
        this.Childs = [];
        this.IsChildVisible = false;
    }
    Label: any;
    Icon?: any;
    RouterLink: any;
    Childs: CustomMenuItem[];
    IsChildVisible: boolean;
}