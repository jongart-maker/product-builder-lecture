class LottoNumbers extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const numbers = JSON.parse(this.getAttribute('numbers')) || [];
    this.shadowRoot.innerHTML = `
      <style>
        .lotto-numbers-wrapper {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
        }
        .lotto-number {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50px;
          height: 50px;
          background-color: var(--number-bg, #f0f0f0);
          border-radius: 50%;
          margin: 0.5rem;
          font-size: 1.2rem;
          font-weight: bold;
          color: var(--text-color, #333);
          transition: background-color 0.3s, color 0.3s;
        }
      </style>
      <div class="lotto-numbers-wrapper">
        ${numbers.map(number => `<div class="lotto-number">${number}</div>`).join('')}
      </div>
    `;
  }

  static get observedAttributes() {
    return ['numbers'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'numbers') {
      this.render();
    }
  }
}

customElements.define('lotto-numbers', LottoNumbers);


function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

document.getElementById('generate-btn').addEventListener('click', () => {
    const lottoNumbers = generateLottoNumbers();
    const lottoNumbersContainer = document.getElementById('lotto-numbers-container');
    lottoNumbersContainer.innerHTML = `<lotto-numbers numbers='${JSON.stringify(lottoNumbers)}'></lotto-numbers>`;
});

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.textContent = 'Light Mode';
}

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = 'Dark Mode';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = 'Light Mode';
    }
});
