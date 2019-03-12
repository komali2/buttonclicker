let count = 0;
const COUNTER = document.querySelector('.click-counter');

class Button {
  constructor(type, cb) {
    this.type = type;
    this.external_callback = cb || function(){};
    this.element = document.createElement('button');
    this.element.classList.add(this.type);
    this.element.innerHTML = this.type.charAt(0).toUpperCase() + this.type.slice(1);
    this.element.onclick = this.onclick.bind(this);
  }
  onclick() {
    this.external_callback();
  }
  static basicClick() {
    this.incrementCount();
  }
}

class Game {
  constructor() {
    this.arena = document.querySelector('.arena');
    this.upgrades = document.querySelector('.upgrades');
    this.state = {
      basic_increment: 1,
    };
    this.arena = new DomArea('main .arena', this.state);
    this.upgrades = new UpgradesList('main .upgrades', this.state);
  }
  stateCheck(count) {
    if (count === 10) {
      this.addButtonToUpgrades(
        new Button('addClicker', this.addBasicButtonToArena.bind(this)),
      );
    }
  }
  addBasicButtonToArena() {
    const button = new Button('click', this.incrementCount.bind(this));
    this.arena.addButton(button);
  }
  addButtonToUpgrades(button) {
    this.upgrades.addButton(button);
  }
  incrementCount() {
    count += this.state.basic_increment;
    COUNTER.innerHTML = count;
    this.stateCheck(count);
  }
  addAnotherArenaButton() {
    this.state.basic_increment++;
    addButtonToArena(createButton('Click', 'click', CLICK_BUTTON));
  }
}

class DomArea {
  constructor(selector, state) {
    this.state = state;
    this.element = document.querySelector(selector);
    this.domlist = [];
  }
  addButton(button) {
    let el;
    if (button instanceof Button) {
      el = button.element;
    } else {
      el = button;
    }
    this.domlist.push(el);
    this.element.appendChild(el);
    return this.element;
  }
}

class UpgradesList extends DomArea {
  constructor(selector) {
    super(selector);
  }
  addButton(button) {
    let el;
    if (button instanceof Button) {
      el = button.element;
    } else {
      el = button;
    }
    this.domlist.push(el);
    const upgrades_list = this.element.querySelector('ul');
    const new_upgrade_list_item = document.createElement('li');
    new_upgrade_list_item.appendChild(el);
    upgrades_list.appendChild(new_upgrade_list_item);
    return this.upgrades_list;
  }
}

const game = new Game();
game.addBasicButtonToArena();