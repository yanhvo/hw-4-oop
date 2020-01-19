/**
* Класс, объекты которого описывают параметры заказа.
*
* @constructor
* @param items        Позиции
* @param payment      Факт оплаты закакза
*/
function Order(...items) {
  this.items = items;
  this.payment = false;
};

/**
* Класс, объекты которого описывают параметры позиции из меню.
*
* @constructor
* @param name        Название
* @param price       Цена
* @param calories    Калорийность
*/
function Item(name, price, calories) {
  this.name = name;
  this.price = price;
  this.calories = calories;
};

/**
* Класс, объекты которого описывают параметры гамбургера.
*
* @constructor
* @param size        Размер
* @param stuffing    Начинка
*/
function Hamburger(size, stuffing) {
  Item.call(this);
  this.name = size.name + ' hamburger with ' + stuffing.name;
  this.price = size.price + stuffing.price;
  this.calories = size.calories + stuffing.calories;
  this.size = size.name;
  this.stuffing = stuffing.name;
};

/**
* Класс, объекты которого описывают параметры салата.
*
*/
function Salad(type) {
  this.name = type.name + ' salad';
  Item.call(this, this.name, type.price, type.calories);
};

/**
* Класс, объекты которого описывают параметры напитка.
*
*/
function Drink(type) {
  Item.call(this, type.name, type.price, type.calories);
};


/* Наследование методов от Item*/
Hamburger.prototype = Object.create(Item.prototype);
Salad.prototype = Object.create(Item.prototype);
Drink.prototype = Object.create(Item.prototype);
Order.prototype = Object.create(Item.prototype);

/**
 * Узнать название позици
 */
Item.prototype.calculatePrice = function () {
  console.log('This is a ' + this.name);
};

/**
 * Узнать цену
 */
Item.prototype.calculatePrice = function () {
  console.log(this.price + ' tgr');
};

/**
 * Узнать калорийность
 */
Item.prototype.calculateCalories = function () {
  console.log(this.calories + ' kkal');
};

/**
 * Узнать размер гамбургера
 */
Hamburger.prototype.getSize = function () {
  console.log('Size of your Hamburger is ' + this.size);
};

/**
 * Узнать начинку гамбургера
 */
Hamburger.prototype.getStuffing = function () {
  console.log('Stuffing of your Hamburger is ' + this.stuffing);
};

/**
 * Подробности заказа
 */
Order.prototype.aboutOrder = function () {
  var items_in_order = [];
  this.items.forEach(item1 => {
    k=0;
    this.items.forEach(item2 => {
    if(item1.name==item2.name) k++; });
    items_in_order.push(item1.name + ' - ' + k); });
    var items_in_order = Array.from(new Set(items_in_order));
    console.log(items_in_order.join(' :: '));
};

/**
 * Узнать цену заказа
 */
Order.prototype.totalPrice = function () {
  var total = 0;
  this.items.forEach(item => { total += item.price; });
  console.log('Total price: '+ total);
};

/**
 * Узнать калорийность заказа
 */
Order.prototype.totalCalories = function () {
  var total = 0;
  this.items.forEach(item => { total += item.calories; });
  console.log('Total calories: '+ total);
};

/**
 * Добавить позиции в заказ
 */
Order.prototype.addItems = function (...new_items) {
  if (this.payment == false){
    this.items = this.items.concat(new_items);
  }else{console.log('Order has already been paid!');}
};

/**
 * Удалить позиции из заказа
 */
Order.prototype.removeItems = function (...rem_items) {
  if (this.payment == false){
    rem_items.forEach( rem_item => {
    this.items.splice(this.items.findIndex(item => item.name === rem_item.name), 1);
    });
  }else{console.log('Order has already been paid!');}
};

/**
 * Оплатить заказ
 */
Order.prototype.payOrder = function () {
  this.payment = true;
  console.log('Order paid successfully!');
};

/* Меню */
Hamburger.SIZE_SMALL = {name: "Small", price: 50, calories: 20};
Hamburger.SIZE_LARGE = {name: "Big", price: 100, calories: 40};
Hamburger.STUFFING_CHEESE = {name: "cheese", price: 10, calories: 20};
Hamburger.STUFFING_SALAD = {name: "salad", price: 20, calories: 5};
Hamburger.STUFFING_POTATO = {name: "potato", price: 15, calories: 10};

Salad.CESAR_SALAD = {name: "Cesar", price: 100, calories: 20};
Salad.OLIVIER_SALAD = {name: "Olivier", price: 50, calories: 80};

Drink.COCA_COLA = {name: "Coca-cola", price: 50, calories: 40};
Drink.COFFEE = {name: "Coffee", price: 80, calories: 20};

/* Позиции для заказа */
var hamburger1 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
var salad = new Salad(Salad.CESAR_SALAD);
var drink1 = new Drink(Drink.COFFEE);
var order = new Order(hamburger1, salad, salad, drink1);

//выводим данные по заказу
order.aboutOrder();
order.totalPrice();
order.totalCalories();

/* Новые позиции для заказа */
var hamburger2 = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_POTATO);
var drink2 = new Drink(Drink.COFFEE);

order.addItems(hamburger2, drink2);
order.aboutOrder();
order.totalPrice();
order.totalCalories();

order.removeItems(salad, drink2);
order.aboutOrder();
order.totalPrice();
order.totalCalories();

order.payOrder();
order.removeItems(drink1);

salad.calculateCalories();
