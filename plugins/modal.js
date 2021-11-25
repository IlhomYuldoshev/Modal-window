// function changeModal(
//   modalElem,
//   {
//     title = "title",
//     closable = true,
//     content = "lorem ipsum",
//     width = 600,
//   } = {}
// ) {
//   const closeBtn = modalElem.querySelector(".modal-close");
//   const titleModal = modalElem.querySelector(".modal-title");
//   const windowModal = modalElem.querySelector(".modal-window");
//   const bodyModal = modalElem.querySelector(".modal-body");
//   const footerModal = modalElem.querySelector(".vmodal-footer");
//   closeBtn.style.display = "inline-block";
//   if (!closable) {
//     closeBtn.style.display = "none";
//   }

//   titleModal.innerHTML = title;
//   windowModal.style.width = width + "px";
//   bodyModal.innerHTML = `<p>${content}</p>`;
// }

//*===============================================================

Element.prototype.appendAfter = function (element) {
  element.parentNode.insertBefore(this, element.nextSibling);
};

function _createModalFooter(buttons, ifDelModal) {
  if (buttons.length === 0) {
    return document.createElement("div");
  }

  const wrap = document.createElement("div");
  wrap.classList.add("vmodal-footer");

  buttons.forEach((btn) => {
    const $btn = document.createElement("button");
    $btn.textContent = btn.text;
    $btn.classList.add("btn");
    $btn.classList.add(`btn-${btn.type || "secondary"}`);
    $btn.onclick = btn.handler;
    if (ifDelModal) {
      if (btn.type === "primary") {
        $btn.setAttribute("data-delmodal", "");
      } else if (btn.type === "danger") {
        $btn.setAttribute("data-delmodalcancel", "");
      }
    }
    wrap.appendChild($btn);
  });

  return wrap;
}

function _createModal({
  title = "title",
  closable = true,
  content = "lorem ipsum",
  width = 600,
  forDel = false,
  footerButtons,
} = {}) {
  const modal = document.createElement("div");
  modal.classList.add("vmodal");
  modal.insertAdjacentHTML(
    "afterbegin",
    `<div class="modal-overlay" data-close="close">
      <div class="modal-window" style=width:${width}px>
        <div class="modal-header">
          <span class="modal-title">${title}</span>
          <span class="modal-close" data-close="close">${
            closable ? "&times;" : ""
          }</span>
        </div>
        <div class="modal-body" data-content>
          ${content}
        </div>
        
      </div>
    </div>`
  );
  const footerWrap = _createModalFooter(footerButtons, forDel);
  footerWrap.appendAfter(modal.querySelector("[data-content]"));
  document.body.append(modal);

  return modal;
}

function noop() {}

$.modal = function (options) {
  const ANIMATION_SPEED = 300;
  const $modal = _createModal(options);
  let closing = false;
  let destroyed = false;

  const modal = {
    open() {
      //? yopilish animatsiyasida open klasini qo'shmasligi kk
      if (destroyed) {
        return console.log("Modal is destroyed");
      }
      !closing && $modal.classList.add("open");
      if (options.forDel) {
        return new Promise((resolve, reject) => {
          $modal.querySelector("[data-delmodal]").onclick = noop;
          $modal.querySelector("[data-delmodalcancel]").onclick = noop;
          resolve([
            $modal.querySelector("[data-delmodal]"),
            $modal.querySelector("[data-delmodalcancel]"),
          ]);
        });
      }
    },
    close() {
      closing = true;
      $modal.classList.remove("open");
      $modal.classList.add("hide");
      setTimeout(() => {
        $modal.classList.remove("hide");
        closing = false;
      }, ANIMATION_SPEED);
    },
    // destroy() {
    // document.body.removeChild($modal);
    // },
    // setContent(options) {
    //   changeModal($modal, options);
    // },
  };

  const listener = (e) => {
    if (e.target.dataset.close) {
      modal.close();
    }
  };

  $modal.addEventListener("click", listener);
  // const closeBtn = $modal.querySelector(".modal-close");
  // const overlayField = $modal.querySelector(".modal-overlay");
  //* Functions
  // function closeFunc(obj) {
  //   obj.close();
  // }
  //* Events
  // closeBtn.addEventListener("click", () => {
  //   modalObj.close();
  // });
  // overlayField.addEventListener("click", (e) => {
  //   // console.log(e.path[0]);
  //   if (e.path[0].classList.contains("modal-overlay")) {
  //     modalObj.close();
  //   }
  // });

  //*-------------

  return Object.assign(modal, {
    destroy() {
      $modal.parentNode.removeChild($modal);
      destroyed = true;
    },
    setContent(html) {
      $modal.querySelector("[data-content]").innerHTML = html;
    },
  });
};
