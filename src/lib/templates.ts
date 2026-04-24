export interface GeneratedApp {
  html: string;
  css: string;
  js: string;
}

export const getTemplate = (prompt: string): GeneratedApp => {
  const p = prompt.toLowerCase();

  if (p.includes('calculadora') || p.includes('calculator')) {
    return {
      html: `
<div class="calculator">
  <div class="display" id="display">0</div>
  <div class="buttons">
    <button class="btn btn-clear">C</button>
    <button class="btn btn-op">/</button>
    <button class="btn btn-op">*</button>
    <button class="btn btn-op">-</button>
    <button class="btn">7</button>
    <button class="btn">8</button>
    <button class="btn">9</button>
    <button class="btn btn-op" style="grid-row: span 2">+</button>
    <button class="btn">4</button>
    <button class="btn">5</button>
    <button class="btn">6</button>
    <button class="btn">1</button>
    <button class="btn">2</button>
    <button class="btn">3</button>
    <button class="btn btn-equal" style="grid-row: span 2">=</button>
    <button class="btn" style="grid-column: span 2">0</button>
    <button class="btn">.</button>
  </div>
</div>`,
      css: `
body { font-family: 'Inter', sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #f0f2f5; }
.calculator { background: #1e293b; padding: 20px; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.2); width: 320px; }
.display { background: #0f172a; color: #38bdf8; font-size: 2.5rem; text-align: right; padding: 20px; border-radius: 12px; margin-bottom: 20px; overflow: hidden; font-family: 'JetBrains Mono', monospace; }
.buttons { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.btn { background: #334155; border: none; color: white; padding: 20px 0; border-radius: 12px; font-size: 1.25rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
.btn:hover { background: #475569; transform: scale(1.05); }
.btn:active { transform: scale(0.95); }
.btn-op { background: #3b82f6; }
.btn-op:hover { background: #60a5fa; }
.btn-clear { background: #ef4444; }
.btn-clear:hover { background: #f87171; }
.btn-equal { background: #10b981; }
.btn-equal:hover { background: #34d399; }`,
      js: `
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const text = button.innerText;
    if (text === 'C') {
      currentInput = '0';
    } else if (text === '=') {
      try {
        currentInput = eval(currentInput).toString();
      } catch {
        currentInput = 'Error';
      }
    } else {
      if (currentInput === '0' || currentInput === 'Error') currentInput = '';
      currentInput += text;
    }
    display.innerText = currentInput;
  });
});`
    };
  }

  if (p.includes('clima') || p.includes('weather') || p.includes('tempo')) {
    return {
      html: `
<div class="weather-card">
  <div class="header">
    <div class="city">São Paulo</div>
    <div class="date">Terça, 21 de Abril</div>
  </div>
  <div class="main-info">
    <div class="temp">24°<span>C</span></div>
    <div class="desc">Chuva Leve</div>
  </div>
  <div class="details">
    <div class="detail-item">
      <span>Umidade</span>
      <strong>78%</strong>
    </div>
    <div class="detail-item">
      <span>Vento</span>
      <strong>12 km/h</strong>
    </div>
    <div class="detail-item">
      <span>UV</span>
      <strong>Baixo</strong>
    </div>
  </div>
</div>`,
      css: `
body { font-family: 'Inter', sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: linear-gradient(180deg, #1e3a8a 0%, #3b82f6 100%); color: white; }
.weather-card { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.2); padding: 40px; border-radius: 40px; width: 350px; text-align: center; box-shadow: 0 30px 60px rgba(0,0,0,0.3); }
.header .city { font-size: 2rem; font-weight: 800; margin-bottom: 5px; }
.header .date { font-size: 0.9rem; opacity: 0.7; }
.main-info { margin: 40px 0; }
.main-info .temp { font-size: 6rem; font-weight: 900; line-height: 1; }
.main-info .temp span { font-size: 2rem; vertical-align: top; margin-left: 5px; opacity: 0.7; }
.main-info .desc { font-size: 1.2rem; margin-top: 10px; font-weight: 500; font-style: italic; }
.details { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 40px; background: rgba(0,0,0,0.2); border-radius: 20px; padding: 20px; }
.detail-item span { display: block; font-size: 0.75rem; opacity: 0.6; margin-bottom: 5px; text-transform: uppercase; }
.detail-item strong { font-size: 1rem; }`,
      js: `console.log("Weather app initialized");`
    };
  }

  if (p.includes('tarefa') || p.includes('todo') || p.includes('lista')) {
    return {
      html: `
<div class="todo-app">
  <h1>Minhas Tarefas</h1>
  <div class="input-group">
    <input type="text" id="todoInput" placeholder="O que precisa ser feito?">
    <button id="addBtn">Add</button>
  </div>
  <ul id="todoList">
    <li class="completed">Explorar o AppMaker AI <span>✓</span></li>
    <li>Criar um protótipo incrível <span>×</span></li>
  </ul>
</div>`,
      css: `
body { font-family: 'Inter', sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #fdf2f8; }
.todo-app { background: white; padding: 30px; border-radius: 30px; width: 400px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1); border: 4px solid #fecdd3; }
h1 { color: #be185d; font-weight: 800; font-size: 2rem; margin-top: 0; margin-bottom: 25px; text-align: center; }
.input-group { display: flex; gap: 10px; margin-bottom: 30px; }
input { flex: 1; padding: 15px; border-radius: 12px; border: 2px solid #fb7185; outline: none; font-size: 1rem; }
button { background: #f43f5e; color: white; border: none; padding: 0 20px; border-radius: 12px; font-weight: 700; cursor: pointer; transition: 0.2s; }
button:hover { background: #e11d48; }
ul { list-style: none; padding: 0; }
li { padding: 15px; background: #fff1f2; border-radius: 12px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; font-weight: 500; color: #881337; }
li.completed { opacity: 0.5; text-decoration: line-through; }
span { cursor: pointer; font-weight: bold; }`,
      js: `
const input = document.getElementById('todoInput');
const btn = document.getElementById('addBtn');
const list = document.getElementById('todoList');

btn.addEventListener('click', () => {
  if (!input.value) return;
  const li = document.createElement('li');
  li.innerHTML = \`\${input.value} <span>×</span>\`;
  list.appendChild(li);
  input.value = '';
  li.addEventListener('click', () => {
    li.classList.toggle('completed');
  });
});

document.querySelectorAll('li').forEach(li => {
  li.addEventListener('click', () => {
    li.classList.toggle('completed');
  });
});`
    };
  }

  // Default fallback
  return {
    html: `
<div class="hero">
  <h1>Seu Novo App</h1>
  <p>Comece a construir algo incrível hoje mesmo.</p>
  <button class="btn">Saiba Mais</button>
</div>`,
    css: `
body { font-family: 'Inter', sans-serif; margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #fafafa; }
.hero { text-align: center; padding: 40px; border-radius: 40px; background: white; box-shadow: 0 20px 40px rgba(0,0,0,0.1); border: 2px solid #ddd; max-width: 500px; }
h1 { font-size: 3rem; font-weight: 900; color: #111; margin: 0; letter-spacing: -2px; }
p { font-size: 1.2rem; color: #666; margin: 20px 0 40px; font-weight: 400; }
.btn { background: #000; color: #fff; padding: 15px 40px; border-radius: 99px; border: none; font-weight: 700; cursor: pointer; transition: 0.2s; font-size: 1.1rem; }
.btn:hover { background: #333; transform: scale(1.05); }`,
    js: `console.log("App initialized");`
  };
};
