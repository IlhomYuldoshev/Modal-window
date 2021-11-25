function _createItems(arrFruits) {
  const fruits = document.createElement("div");
  fruits.classList.add("row");

  arrFruits.forEach((item) => {
    fruits.insertAdjacentHTML(
      "beforeend",
      `<div class="col" id=${item.id}>
      <div class="card" style="width: 18rem">
        <img
          class="card-img-top"
          src="${item.img}"
          alt="Card image cap"
          width="400"
        />
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <button data-idbtn="${item.id}" class="btn btn-primary" data-seeprice>See price</button>
          <button data-idbtn="${item.id}" class="btn btn-danger" data-delitem>Delete</button>
        </div>
      </div>
    </div>`
    );
  });

  document.body
    .querySelector(".container")
    .insertAdjacentElement("beforeend", fruits);

  return fruits;
}

async function confrimDel(e) {
  console.log(e);
  // modalDeleteItem.querySelector("[data-close]").addEventListener("click");
}

$.fruits = function (arr = []) {
  const fruits = _createItems(arr);

  const listenerSeePrice = function () {
    // const itemId = fruits.a;
    const fruitId = this.dataset.idbtn;
    const currentFruit = arr.find((item) => fruitId == item.id);

    modalPrice.setContent(
      `${currentFruit.title} is <strong>${currentFruit.price}$</strong>`
    );
    modalPrice.open();
  };

  const listenerDeleteItem = function () {
    // const itemId = fruits.a;
    const fruitId = this.dataset.idbtn;
    const currentFruit = arr.find((item) => fruitId == item.id);

    modalDeleteItem.setContent(currentFruit.title);

    modalDeleteItem
      .open()
      .then(([ok, cancel]) => {
        return new Promise((res, rej) => {
          ok.addEventListener("click", res);
          cancel.addEventListener("click", rej);

          cancel.closest(".modal-overlay").addEventListener("click", (e) => {
            if (e.target === e.currentTarget) {
              return rej();
            }
          });
        });
      })
      .then(() => {
        return new Promise((res) => {
          document.querySelector(".row").removeChild(this.closest(".col"));
          res();
        });
      })
      .then(() => {
        console.log("resolve ishladi");
        modalDeleteItem.close();
      })
      .catch((err) => {
        console.log("reject ishladi");
        modalDeleteItem.close();
      });
  };

  fruits
    .querySelectorAll("[data-seeprice]")
    .forEach((i) => i.addEventListener("click", listenerSeePrice));

  fruits
    .querySelectorAll("[data-delitem]")
    .forEach((i) => i.addEventListener("click", listenerDeleteItem));
};
