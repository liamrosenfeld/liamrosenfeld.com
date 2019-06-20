const Typer = class {
  constructor(element) {
    // The HTML Element
    this.element = element;

    // Constants
    this.words = element.innerHTML;
    this.delay = 60;

    // Counters
    this.char = 0;
    this.typing = true;
  }

  doTyping() {
    // Set Display
    const currentDisplay = this.words.substring(0, this.char);
    this.element.innerHTML = currentDisplay;

    // Go To Next Char (If There)
    if (this.char == this.words.length) {
      this.typing = false;
    } else {
      this.char += 1;
    }

    // Call Again After Delay
    const myself = this;
    if (this.typing) {
      setTimeout(function() {
        myself.doTyping();
      }, this.delay);
    }
  }

}

function TyperSetup() {
  // Get Elements
  const elements = document.getElementsByClassName("typer");

  // Create Instances and Start
  let typers = {};
  for (let e of elements) {
    typers[e.id] = new Typer(e);
    typers[e.id].doTyping();
  }
}

TyperSetup();
