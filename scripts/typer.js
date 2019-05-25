var Typer = function(element) {
  this.element = element;
  this.words = element.dataset.words.split("STOP").filter(function(v){return v;}); // non empty words
  this.delay = element.dataset.delay || 200;
  this.deleteDelay = element.dataset.deletedelay || element.dataset.deleteDelay || 800;

  this.progress = { word:0, char:0, building:true, atWordEnd:false, looped: 0 };
  this.typing = true;

  var colors = element.dataset.colors || "black";
  this.colors = colors.split(",");
  this.element.style.color = this.colors[0];
  this.colorIndex = 0;

  this.doTyping();
};

Typer.prototype.start = function() {
  if (!this.typing) {
    this.typing = true;
    this.doTyping();
  }
};
Typer.prototype.stop = function() {
  this.typing = false;
};
Typer.prototype.doTyping = function() {
  var e = this.element;
  var p = this.progress;
  var w = p.word;
  var c = p.char;
  var currentDisplay = [...this.words[w]].slice(0, c).join("");
  p.atWordEnd = false;

  e.innerHTML = currentDisplay;

  if (p.building) {
    if (p.char == [...this.words[w]].length) {
      p.building = false;
      p.atWordEnd = true;
    } else {
      p.char += 1;
    }
  } else {
    if (p.char == 0) {
      p.building = true;
      p.word = (p.word + 1) % this.words.length;
      this.colorIndex = (this.colorIndex + 1) % this.colors.length;
      this.element.style.color = this.colors[this.colorIndex];
    } else {
      p.char -= 1;
    }
  }

  if(p.atWordEnd) p.looped += 1;

  if(!p.building){
    this.typing = false;
  }

  var myself = this;
  setTimeout(function() {
    if (myself.typing) { myself.doTyping(); };
  }, p.atWordEnd ? this.deleteDelay : this.delay);
};

function TyperSetup() {
  var typers = {};
  var elements = document.getElementsByClassName("typer");
  for (var i = 0, e; e = elements[i++];) {
    typers[e.id] = new Typer(e);
  }
}

TyperSetup();
