const items = document.querySelector(".items");
const input = document.querySelector(".footer__input");
const addBtn = document.querySelector(".footer__button");
const TOBUY_LS = "name";
let toBuy = [];

function onAdd() {
  const text = input.value;
  if (text === "") {
    input.focus();
    return;
  }
  const item = createItem(text);
  items.appendChild(item);
  item.scrollIntoView({ block: "center" });
  input.value = "";
  input.focus();
}

let id = 0;
function createItem(text) {
  const now = new Date();

  const itemRow = document.createElement("li");
  itemRow.setAttribute("class", "item__row");
  itemRow.setAttribute("data-id", id);
  itemRow.innerHTML = `
    <div class="item" >
      <div class="item__context">
        <span class="item__name">${text}</span>
        <span class="item__created">${now.getMonth() + 1}월 ${now.getDate()}일</span>
      </div> 
        <button class="item__delete">
          <i class="fas fa-trash-alt" data-id=${id}></i>
        </button> 
    </div>
    <div class="item__divider"></div>
  `;
  const toBuyObj = {
    text,
    id,
  };
  console.log(toBuyObj);
  toBuy.push(toBuyObj);
  saveToBuy();
  id++;
  return itemRow;
}

addBtn.addEventListener("click", () => {
  onAdd();
});

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    onAdd();
  }
});

items.addEventListener("click", (event) => {
  const id = event.target.dataset.id;
  if (id) {
    const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
    toBeDeleted.remove();
    const cleanToBuy = toBuy.filter(function (toBuys) {
      // console.log(toBeDeleted.dataset.id);
      return toBuys.id !== parseInt(toBeDeleted.dataset.id);
    });
    console.log(JSON.stringify(cleanToBuy));
    toBuy = cleanToBuy;
    saveToBuy();
  }
});

function saveToBuy() {
  //localStorage에 toBuy object형태를 string처리
  localStorage.setItem(TOBUY_LS, JSON.stringify(toBuy));
}

function loadToBuy() {
  const loadedToBuy = localStorage.getItem(TOBUY_LS);
  if (loadedToBuy !== null) {
    const parsedToDos = JSON.parse(loadedToBuy);
    parsedToDos.forEach(function (toBuys) {
      const item = createItem(toBuys.text);
      items.appendChild(item);
      console.log(toBuys.text);
    });
  }
}

loadToBuy();