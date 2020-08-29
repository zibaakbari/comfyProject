function elementBuilder(name) {
  this.element = document.createElement(name);
  this.text = function (text) {
    this.element.textContent = text;
    return this;
  };
  this.type = function (type) {
    this.element.type = type;
    return this;
  };
  this.placeholder = function (text) {
    this.element.placeholder = text;
    return this;
  };
  this.value = function (value) {
    this.element.value = value;
    return this;
  };
  this.appendTo = function (parent) {
    if (parent instanceof elementBuilder) {
      parent.build().appendChild(this.element);
      return this;
    } else {
      parent.appendChild(this.element);
      return this;
    }
  };
  this.build = function () {
    return this.element;
  };
  this.hide = function () {
    this.element.style.display = "none";
    return this;
  };
  this.show = function () {
    this.element.style.display = "block";
    return this;
  };
  this.className = function (className) {
    this.element.className = className;
    return this;
  };
  this.onclick = function (fn) {
    this.element.onclick = fn;
    return this;
  };
  this.html = function (htmlValue) {
    this.element.innerHTML = htmlValue;
    return this;
  };
  this.src = function (src) {
    this.element.src = src;
    return this;
  };
  this.alt = function (alt) {
    this.element.alt = alt;
    return this;
  };
}
const builder = {
  create: function (name) {
    return new elementBuilder(name);
  },
};
