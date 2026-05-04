const state = {
  balance: 10,
  tasks: [
    { id: 1, label: { text: "刷牙", zhuyin: ["ㄕㄨㄚ", "ㄧㄚˊ"] }, reward: 2, done: false },
    { id: 2, label: { text: "收玩具", zhuyin: ["ㄕㄡ", "ㄨㄢˊ", "ㄐㄩˋ"] }, reward: 3, done: false },
    { id: 3, label: { text: "寫作業", zhuyin: ["ㄒㄧㄝˇ", "ㄗㄨㄛˋ", "ㄧㄝˋ"] }, reward: 5, done: false }
  ],
  shop: [
    { id: 1, label: { text: "貼紙", zhuyin: ["ㄊㄧㄝ", "ㄓˇ"] }, cost: 5 },
    { id: 2, label: { text: "小點心", zhuyin: ["ㄒㄧㄠˇ", "ㄉㄧㄢˇ", "ㄒㄧㄣ"] }, cost: 8 }
  ]
};

function createZhuyinLabel(text, zhuyin) {
  const wrapper = document.createElement("span");
  wrapper.className = "zhuyin-label";

  [...text].forEach((char, index) => {
    const ruby = document.createElement("ruby");
    const rb = document.createElement("rb");
    rb.textContent = char;
    ruby.appendChild(rb);

    const syllable = zhuyin[index];
    if (syllable) {
      const rt = document.createElement("rt");
      rt.textContent = syllable;
      ruby.appendChild(rt);
    }

    wrapper.appendChild(ruby);
  });

  return wrapper;
}

function render() {
  document.getElementById("balance").textContent = state.balance;

  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  state.tasks.forEach((task) => {
    const li = document.createElement("li");

    const taskName = createZhuyinLabel(task.label.text, task.label.zhuyin);
    li.appendChild(taskName);

    const button = document.createElement("button");
    button.className = "done";
    button.textContent = task.done ? "取消完成" : `完成 +${task.reward}`;
    button.onclick = () => {
      task.done = !task.done;
      state.balance += task.done ? task.reward : -task.reward;
      render();
    };

    li.appendChild(button);
    taskList.appendChild(li);
  });

  const shopList = document.getElementById("shopList");
  shopList.innerHTML = "";
  state.shop.forEach((item) => {
    const li = document.createElement("li");

    const itemName = createZhuyinLabel(item.label.text, item.label.zhuyin);
    li.appendChild(itemName);

    const button = document.createElement("button");
    button.className = "buy";
    button.textContent = `兌換 -${item.cost}`;
    button.onclick = () => {
      if (state.balance < item.cost) {
        alert("代幣不足");
        return;
      }
      state.balance -= item.cost;
      alert(`已兌換：${item.label.text}`);
      render();
    };

    li.appendChild(button);
    shopList.appendChild(li);
  });
}

render();
