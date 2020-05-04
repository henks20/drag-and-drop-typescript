class ProjectInput {
    templateElement: HTMLTemplateElement; // enable because added in tsconifg lib: dom
    hostElement: HTMLDivElement;
    element: HTMLFontElement;

    constructor() {
        // równoważne znakowi ! na końcu, ktory mowi nie boj sie, ten element istnieje, zaufaj mi...
        // const templateEl = document.getElementById('project-input');
        // if(templateEl){
        //     this.templateElement = templateEl;
        // }
        // this.templateElement = <HTMLTemplateElement>document.getElementById('project-input')!; // have to add in type
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement; // have to add in type
        this.hostElement = document.getElementById('app')! as HTMLDivElement;
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFontElement;
        this.attach();
    }

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}

const prjInput = new ProjectInput();