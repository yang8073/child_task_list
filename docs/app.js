const state = {
  balance: 10,
  tasks: [
    { id: 1, name: "刷牙（ㄕㄨㄚ ㄧㄚˊ）", reward: 2, done: false },
    { id: 2, name: "收玩具（ㄕㄡ ㄨㄢˊ ㄐㄩˋ）", reward: 3, done: false },
    { id: 3, name: "寫作業（ㄒㄧㄝˇ ㄗㄨㄛˋ ㄧㄝˋ）", reward: 5, done: false }
  ],
  shop: [
    { id: 1, name: "貼紙（ㄊㄧㄝ ㄓˇ）", cost: 5 },
    { id: 2, name: "小點心（ㄒㄧㄠˇ ㄉㄧㄢˇ ㄒㄧㄣ）", cost: 8 }
  ]
};

function render() {
  document.getElementById("balance").textContent = state.balance;

  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  state.tasks.forEach((task) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.className = "done";
    button.textContent = task.done ? "取消完成" : `完成 +${task.reward}`;
    button.onclick = () => {
      task.done = !task.done;
      state.balance += task.done ? task.reward : -task.reward;
      render();
    };
    li.innerHTML = `<span>${task.name}</span>`;
    li.appendChild(button);
    taskList.appendChild(li);
  });

  const shopList = document.getElementById("shopList");
  shopList.innerHTML = "";
  state.shop.forEach((item) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.className = "buy";
    button.textContent = `兌換 -${item.cost}`;
    button.onclick = () => {
      if (state.balance < item.cost) {
        alert("代幣不足（ㄅㄨˋ ㄗㄨˊ）");
        return;
      }
      state.balance -= item.cost;
      alert(`已兌換：${item.name}`);
      render();
    };
    li.innerHTML = `<span>${item.name}</span>`;
    li.appendChild(button);
    shopList.appendChild(li);
  });
}

render();
