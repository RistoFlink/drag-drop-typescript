// creating an autobind decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
	const originalMethod = descriptor.value;
	const adjDescriptor: PropertyDescriptor = {
		configurable: true,
		get() {
			const boundFunction = originalMethod.bind(this);
			return boundFunction;
		}
	};
	return adjDescriptor;
}
// ProjectInput class
class ProjectInput {
	templateElement: HTMLTemplateElement;
	hostElement: HTMLDivElement;
	element: HTMLFormElement;
	titleInputElement: HTMLInputElement;
	descriptionInputElement: HTMLInputElement;
	peopleInputElement: HTMLInputElement;

	constructor() {
		this.templateElement = document.getElementById("project-input")! as HTMLTemplateElement;
		this.hostElement = document.getElementById("app")! as HTMLDivElement;

		const importedHTMLContent = document.importNode(this.templateElement.content, true);
		this.element = importedHTMLContent.firstElementChild as HTMLFormElement;
		this.element.id = "user-input";

		this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement; 
		this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement;
		this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement;


		this.configure();
		this.attach();
	}

	private attach() {
		this.hostElement.insertAdjacentElement("afterbegin",this.element);
	}

	private configure() {
		this.element.addEventListener("submit", this.submitHandler);
	}

	@autobind
	private submitHandler(event: Event) {
		event.preventDefault();
		// console.log(this.titleInputElement.value);
		const userInput = this.gatherUserInput();
		if (Array.isArray(userInput)) {
			const [title, description, people] = userInput;
			console.log(title, description, people);
			this.clearInput();
		}
	}

	private gatherUserInput(): [string, string, number] | void{
		const enteredTitle = this.titleInputElement.value;
		const enteredDescription = this.descriptionInputElement.value;
		const enteredPeople = this.peopleInputElement.value;

		if (enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 || enteredPeople.trim().length === 0) {
			alert("Invalid input - please try again.");
			return;
		} else {
			return [enteredTitle, enteredDescription, parseFloat(enteredPeople)];
		}
	}

	private clearInput() {
		this.titleInputElement.value = "";
		this.descriptionInputElement.value = "";
		this.peopleInputElement.value = "";
	}
}

const input = new ProjectInput();
