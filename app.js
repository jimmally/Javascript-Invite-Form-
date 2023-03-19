document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrar");
  const input = form.querySelector("input");
  const mainDiv = document.querySelector(".main");
  const ul = document.getElementById("invitedList");

  const div = document.createElement("div");
  const filterLabel = document.createElement("label");
  const filterCheckBox = document.createElement("input");

  filterLabel.textContent = "Hide Those Who Have Not Responded";
  filterCheckBox.type = "checkbox";

  div.appendChild(filterLabel);
  div.appendChild(filterCheckBox);

  mainDiv.insertBefore(div, ul);

  filterCheckBox.addEventListener("change", (e) => {
    const isChecked = e.target.checked;
    const lis = ul.children;

    if (isChecked) {
      for (let i = 0; i < lis.length; i++) {
        let li = lis[i];
        if (li.className === "responded") {
          li.style.display = "";
        } else {
          li.style.display = "none";
        }
      }
    } else {
      for (let i = 0; i < lis.length; i++) {
        let li = lis[i];
        li.style.display = "";
      }
    }
  });

  function createLI(text) {
    function createElement(elementName, property, value) {
      const element = document.createElement(elementName);
      element[property] = value;
      return element;
    }

    function appendToLi(elementName, property, value) {
      const element = createElement(elementName, property, value);
      li.appendChild(element);
      return element;
    }

    const li = document.createElement("li");
    appendToLi("span", "textContent", text);

    const label = appendToLi("label", "textContent", "Confirmed");
    const checkBox = createElement("input", "type", "checkbox");
    label.appendChild(checkBox);

    appendToLi("button", "textContent", "edit");
    appendToLi("button", "textContent", "remove");
    return li;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value;
    input.value = "";

    const li = createLI(text);

    ul.appendChild(li);
  });

  ul.addEventListener("change", (e) => {
    const checkbox = event.target;
    const check = checkbox.checked;
    const listitem = checkbox.parentNode.parentNode;

    if (check) {
      listitem.className = "responded";
    } else {
      listitem.className = "";
    }
  });

  ul.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const button = e.target;
      const li = button.parentNode;
      const ul = li.parentNode;

      const nameActions = {
        remove: () => {
          ul.removeChild(li);
        },

        eidt: () => {
          const span = li.firstElementChild;
          const input = document.createElement("input");
          input.type = "text";
          input.value = span.textContent;
          li.insertBefore(input, span);
          li.removeChild(span);
          button.textContent = "save";
        },

        save: () => {
          const input = li.firstElementChild;
          const span = document.createElement("span");

          span.textContent = input.value;
          li.insertBefore(span, input);
          li.removeChild(input);
          button.textContent = "edit";
        },
      };

      const action = button.textContent;

      if (action === "remove") {
        nameActions.remove();
      } else if (action === "edit") {
        nameActions.eidt();
      } else if (action === "save") {
        nameActions.save();
      }
    }
  });
});
