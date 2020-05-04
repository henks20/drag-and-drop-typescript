// autobind decorator
// function autobind(target: any, methodName: string, descriptor: PropertyDescriptor) {
// wiem ze te zmienne istnieja ale nie bede ich uzywal wiec oznacze jako _
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescripton: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFunction = originalMethod.bind(this);
            return boundFunction;
        }
    }
    return adjDescripton;
}


// ProjectInput Class
class ProjectInput {
    templateElement: HTMLTemplateElement; // enable because added in tsconifg lib: dom
    hostElement: HTMLDivElement;
    element: HTMLFontElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

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
        this.element.id = "user-input";

        this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement;

        this.configure();
        this.attach();
    }

    @autobind
    private submitHandler(e: Event) {
        e.preventDefault();
        console.log(this.titleInputElement.value);
    }

    private configure() {
        this.element.addEventListener('submit', this.submitHandler.bind(this))
    }

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}

const prjInput = new ProjectInput();