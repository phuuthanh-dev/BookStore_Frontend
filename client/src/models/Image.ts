export class Image {
    id: number;
    name?: string;
    icon?: boolean;
    link?: string;
    data: string;


	constructor(id: number, name: string, icon: boolean, link: string, data: string) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.link = link;
        this.data = data;
	}
    
}