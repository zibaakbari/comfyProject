let listFactor = [];
let basketNumber = 0;
const basketNum = document.getElementsByClassName("cart-items")[0];
let factorContainer = document.getElementsByClassName("cart-overlay")[0];
let factor = document.getElementsByClassName("cart")[0];
let shopBasket = document.getElementsByClassName("cart-btn")[0];
class Product {
  constructor(title, id, price, src) {
    this.title = title;
    this.id = id;
    this.price = price;
    this.src = src;
    this.number = 0;
  }
  renderProduct() {
    basketNum.textContent = basketNumber;
    const productsCenter = document.getElementsByClassName(
      "products-center"
    )[0];
    products.forEach((product) => {
      this.showProducts(productsCenter, basketNum, product);
    });
  }
  showProducts(productsCenter, basketNum, product) {
    const imageArticle = builder
      .create("article")
      .className("product")
      .appendTo(productsCenter);
    const imageContainer = builder
      .create("div")
      .className("img-container")
      .appendTo(imageArticle);
    const image = builder
      .create("img")
      .className("product-img")
      .src(product.src)
      .appendTo(imageContainer);
    const bagBtn = builder
      .create("button")
      .text("Add to cart")
      .className("bag-btn")
      .appendTo(imageContainer)
      .onclick(() => {
        this.add(product, basketNum);
      });
    const addIcon = builder
      .create("i")
      .className("fas fa-shopping-cart")
      .appendTo(bagBtn);
    const addIcon2 = builder
      .create("i")
      .className("fas fa-shopping-cart")
      .appendTo(bagBtn);
    const h3 = builder.create("h3").text(product.title).appendTo(imageArticle);
  }
  add(product, basketNum) {
    if (!product.number) {
      listFactor.push(product);
    }
    ++product.number;
    basketNum.textContent = ++basketNumber;
  }
}
const jsonProducts = JSON.parse(items);
let products = jsonProducts.items.map((item) => {
  return new Product(
    item.fields.title,
    item.sys.id,
    item.fields.price,
    item.fields.image.fields.file.url
  );
});
class Cart {
  constructor() {
    this.list = listFactor;
    this.productObj = new Product();
  }
  renderCart() {
    const container = this.header();
    this.cartItems(container);
    this.footer(container);
  }
  header() {
    const cartDiv = builder
      .create("div")
      .className("cart showCart")
      .appendTo(factorContainer);
    const closeSpan = builder
      .create("span")
      .className("close-cart")
      .onclick(() => {
        this.hideCart();
      })
      .appendTo(cartDiv);
    const closeIcon = builder
      .create("i")
      .className("fas fa-window-close")
      .appendTo(closeSpan);
    const h2 = builder.create("h2").text("your cart").appendTo(cartDiv);
    const cartContent = builder
      .create("div")
      .className("cart-content")
      .appendTo(cartDiv);
    return cartContent;
  }
  cartItems(cartContent) {
    this.list.forEach((item) => {
      const cartItem = builder
        .create("div")
        .className("cart-item")
        .appendTo(cartContent);
      const image = builder.create("img").src(item.src).appendTo(cartItem);
      const textDiv = builder.create("div").appendTo(cartItem);
      const title = builder.create("h4").text(item.title).appendTo(textDiv);
      const price = builder.create("h5").text(item.price).appendTo(textDiv);
      const removeItem = builder
        .create("span")
        .className("remove-item")
        .text("remove")
        .onclick(() => {
          this.remove(item);
        })
        .appendTo(textDiv);
      const iconDiv = builder.create("div").appendTo(cartItem);
      const num = builder
        .create("p")
        .className("item-amount")
        .text(item.number);
      const incIcon = builder
        .create("i")
        .className("fas fa-chevron-up")
        .onclick(() => {
          this.inc(item);
        })
        .appendTo(iconDiv);
      num.appendTo(iconDiv);
      const decIcon = builder
        .create("i")
        .className("fas fa-chevron-down")
        .onclick(() => {
          this.dec(item);
        })
        .appendTo(iconDiv);
    });
  }
  footer(cartContent) {
    const footerDiv = builder
      .create("div")
      .className("cart-footer")
      .appendTo(cartContent);
    const h3 = builder.create("h3").text("your total : $ ").appendTo(footerDiv);
    const total = builder.create("span").className("cart-total").appendTo(h3);
    total.text(this.totalP());
    const clearBtn = builder
      .create("button")
      .className("clear-cart banner-btn")
      .text("clear cart")
      .onclick(() => {
        this.clear();
      })
      .appendTo(footerDiv);
  }
  hideCart() {
    factorContainer.classList.remove("transparentBcg");
    factor.classList.remove("showCart");
  }
  inc(item) {
    ++item.number;
    basketNum.textContent = ++basketNumber;
    this.renderCart();
  }
  dec(item) {
    --item.number;
    if (!item.number) {
      ++item.number;
      this.remove(item);
      if (!this.list.length) {
        this.clear();
      }
    } else {
      basketNum.textContent = --basketNumber;
      this.renderCart();
    }
  }
  remove(item) {
    const found = this.list.findIndex((product) => product.id === item.id);
    this.list.splice(found, 1);
    if (!this.list.length) {
      this.clear();
      return;
    }
    basketNumber -= item.number;
    basketNum.textContent = basketNumber;
    this.renderCart();
  }
  totalP() {
    let totalPrice = 0;
    this.list.forEach((item) => {
      totalPrice += item.price * item.number;
    });
    return Math.round(totalPrice);
  }
  clear() {
    factorContainer.classList.remove("transparentBcg");
    factor.classList.remove("showCart");
    listFactor.length = 0;
    basketNumber = 0;
    basketNum.textContent = basketNumber;
    products.forEach((product) => {
      product.number = 0;
    });
  }
}
const product = new Product();
product.renderProduct();
const cart = new Cart();
shopBasket.onclick = () => {
  factorContainer.classList.add("transparentBcg");
  factor.classList.add("showCart");
  cart.renderCart();
};
