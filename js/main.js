//ES6 class
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    //current index of words
    const current = this.wordIndex % this.words.length;
    //Get the full text of current word
    const fullTxt = this.words[current];

    //check if deleting
    if (this.isDeleting) {
      //remove character
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      //add a character
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    //insert txt into element
    this.txtElement.innerHTML = `<span class="txt"> ${this.txt} </span>`;

    //Initial type speed
    let typeSpeed = 300;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    //if the world is complete
    if (!this.isDeleting && this.txt == fullTxt) {
      //make pause at end
      typeSpeed = this.wait;
      //Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      //move to next word
      this.wordIndex++;
      //pause before start typing new word
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

//Init on DOM load
document.addEventListener("DOMContentLoaded", init);

//Init app
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");

  //Init Typewriter
  new TypeWriter(txtElement, words, wait);
}
