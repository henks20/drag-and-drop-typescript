// Validation
interface Validatable {
    value: string | number;
    required?: boolean; // może być bez znaku zapytania ale wtedy boolean | undefined
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(validatableInput: Validatable) {
    let isValid = true;
    if (validatableInput.required) {
        // if(typeof validatableInput.value === 'string'){} => II opcja zamiast toString()
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    } // != zawiera w sobie null i undefined (JS feature)
    if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}


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

// ProjectList Class
class ProjectList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement; // HTMLSectionElement does not exist

    constructor(private type: 'active' | 'finished') {
        this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLElement;
        this.element.id = `${this.type}-projects`;
        this.attach();
        this.renderContent();
    }

    private renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';

    }

    private attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
}


// ProjectInput Class
class ProjectInput {
    templateElement: HTMLTemplateElement; // enable because added in tsconifg lib: dom
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
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
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = "user-input";

        this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement;

        this.configure();
        this.attach();
    }

    private gatherUserInput(): [string, string, number] | void { // union of either tuple or void; tuple is just an array
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        };

        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            minLength: 5,
            required: true
        };

        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            min: 1,
            max: 5,
            required: true
        };

        if (
            !validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)
        ) {
            alert("Invalid input, please try again!");
            return;
            // throw; albo throw Error
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople]; // or parseFloat()
        }
    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    @autobind
    private submitHandler(e: Event) {
        e.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            console.log(title, desc, people);
            this.clearInputs();
        }
        // console.log(this.titleInputElement.value);
    }

    private configure() {
        this.element.addEventListener('submit', this.submitHandler.bind(this))
    }

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}

const prjInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');