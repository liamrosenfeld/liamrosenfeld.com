"use strict";

const Typer = class {
  constructor(element) {
    // The HTML Element
    this.element = element;

    // Constants
    this.words = element.innerHTML;
    this.delay = 60;
    this.element.style.color = "white";

    // Counters
    this.char = 0;
    this.typing = true;
  }

  doTyping() {
    // Set Display
    var currentDisplay = this.words.split("").slice(0, this.char).join("");
    this.element.innerHTML = currentDisplay;

    // Go To Next Char (If There)
    if (this.char == this.words.length) {
      this.typing = false;
    } else {
      this.char += 1;
    }

    // Call Again After Delay
    var myself = this;
    if (this.typing) {
      setTimeout(function() {
        myself.doTyping();
      }, this.delay);
    }
  }

}

function TyperSetup() {
  // Get Elements
  var elements = document.getElementsByClassName("typer");

  // Create Instances and Start
  var typers = {};
  for (var i = 0, e; e = elements[i++];) {
    typers[e.id] = new Typer(e);
    typers[e.id].doTyping();
  }
}

TyperSetup();
