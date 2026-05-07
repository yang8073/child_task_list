const APP_VERSION = "0.2.0";
const ICON_SPRITE = `icons.svg?v=${APP_VERSION}`;

const state = {
  balance: 10,
  tasks: [
    {
      id: 1,
      icon: "tooth",
      label: [
        { char: "刷", zhuyin: "ㄕㄨㄚ" },
        { char: "牙", zhuyin: "ㄧㄚˊ" }
      ],
      reward: 2,
      done: false
    },
    {
      id: 2,
      icon: "toys",
      label: [
        { char: "收", zhuyin: "ㄕㄡ" },
        { char: "玩", zhuyin: "ㄨㄢˊ" },
        { char: "具", zhuyin: "ㄐㄩˋ" }
      ],
      reward: 3,
      done: false
    },
    {
      id: 3,
      icon: "homework",
      label: [
        { char: "寫", zhuyin: "ㄒㄧㄝˇ" },
        { char: "作", zhuyin: "ㄗㄨㄛˋ" },
        { char: "業", zhuyin: "ㄧㄝˋ" }
      ],
      reward: 5,
      done: false
    }
  ],
  shop: [
    {
      id: 1,
      icon: "sticker",
      label: [
        { char: "貼", zhuyin: "ㄊㄧㄝ" },
        { char: "紙", zhuyin: "ㄓˇ" }
      ],
      cost: 5
    },
    {
      id: 2,
      icon: "snack",
      label: [
        { char: "小", zhuyin: "ㄒㄧㄠˇ" },
        { char: "點", zhuyin: "ㄉㄧㄢˇ" },
        { char: "心", zhuyin: "ㄒㄧㄣ" }
      ],
      cost: 8
    }
  ]
};

function createIcon(icon, label, className = "item-icon") {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add(className);
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", label);

  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", `${ICON_SPRITE}#icon-${icon}`);
  svg.appendChild(use);

  return svg;
}

function getPlainText(label) {
  return label.map(({ char }) => char).join("");
}

function createBopomofoText(label, className = "") {
  const word = document.createElement("span");
  word.className = ["bopomofo-word", className].filter(Boolean).join(" ");
  word.setAttribute(
    "aria-label",
    label.map(({ char, zhuyin }) => `${char}${zhuyin}`).join(" ")
  );

  label.forEach(({ char, zhuyin }) => {
    const pair = document.createElement("span");
    pair.className = "bopomofo-pair";
    pair.setAttribute("aria-hidden", "true");

    const han = document.createElement("span");
    han.className = "hanzi";
    han.textContent = char;

    const ruby = document.createElement("span");
    ruby.className = "zhuyin";
    ruby.textContent = zhuyin;

    pair.append(han, ruby);
    word.appendChild(pair);
  });

  return word;
}

function hydrateStaticBopomofo() {
  document.querySelectorAll("[data-bopomofo]").forEach((element) => {
    const label = element.dataset.bopomofo.split(" ").map((token) => {
      const [char, zhuyin] = token.split("|");
      return { char, zhuyin };
    });
    element.textContent = "";
    element.appendChild(createBopomofoText(label));
  });
}

function renderVersion() {
  document.getElementById("appVersion").textContent = APP_VERSION;
}

function renderBalance() {
  document.getElementById("balance").textContent = state.balance;
}

function render() {
  renderVersion();
  renderBalance();

  const taskList = document.getElementById("taskList");
  taskList.textContent = "";
  state.tasks.forEach((task) => {
    const li = document.createElement("li");
    const plainName = getPlainText(task.label);
    const icon = createIcon(task.icon, plainName);
    const name = createBopomofoText(task.label, "item-name");
    const itemLabel = document.createElement("span");
    itemLabel.className = "item-label";
    itemLabel.append(icon, name);
    const button = document.createElement("button");
    button.className = "done";
    button.textContent = task.done ? "取消完成" : `完成 +${task.reward}`;
    button.setAttribute(
      "aria-label",
      `${task.done ? "取消完成" : "完成"}${plainName}`
    );
    button.onclick = () => {
      task.done = !task.done;
      state.balance += task.done ? task.reward : -task.reward;
      render();
    };
    li.append(itemLabel, button);
    taskList.appendChild(li);
  });

  const shopList = document.getElementById("shopList");
  shopList.textContent = "";
  state.shop.forEach((item) => {
    const li = document.createElement("li");
    const plainName = getPlainText(item.label);
    const icon = createIcon(item.icon, plainName);
    const name = createBopomofoText(item.label, "item-name");
    const itemLabel = document.createElement("span");
    itemLabel.className = "item-label";
    itemLabel.append(icon, name);
    const button = document.createElement("button");
    button.className = "buy";
    button.textContent = `兌換 -${item.cost}`;
    button.setAttribute("aria-label", `兌換${plainName}`);
    button.onclick = () => {
      if (state.balance < item.cost) {
        alert("代幣不足");
        return;
      }
      state.balance -= item.cost;
      alert(`已兌換：${plainName}`);
      render();
    };
    li.append(itemLabel, button);
    shopList.appendChild(li);
  });
}

hydrateStaticBopomofo();
render();
