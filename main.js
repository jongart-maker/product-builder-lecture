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
          background-color: #f0f0f0;
          border-radius: 50%;
          margin: 0.5rem;
          font-size: 1.2rem;
          font-weight: bold;
          color: #333;
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
    return Array.from(numbers);
}

document.getElementById('generate-btn').addEventListener('click', () => {
    const lottoNumbers = generateLottoNumbers();
    const lottoNumbersContainer = document.getElementById('lotto-numbers-container');
    lottoNumbersContainer.innerHTML = `<lotto-numbers numbers='${JSON.stringify(lottoNumbers)}'></lotto-numbers>`;
});
