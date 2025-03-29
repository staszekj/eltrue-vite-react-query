export class NavBar extends HTMLElement {
	private navbarTitle: string;
	private shadow: ShadowRoot;

	constructor() {
		super();
		this.navbarTitle = this.getAttribute("title") || "Eltrue";
		this.shadow = this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.render();
	}

	static get observedAttributes() {
		return ["title"];
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (name === "title" && oldValue !== newValue) {
			this.navbarTitle = newValue;
			this.render();
		}
	}

	private render() {
		this.shadow.innerHTML = `
      <style>
        :host {
          display: block;
        }
        nav {
          background-color: #333;
          padding: 1rem;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .title {
          font-size: 1.5rem;
          font-weight: bold;
        }
        .links {
          display: flex;
          gap: 1rem;
        }
        a {
          color: white;
          text-decoration: none;
        }
      </style>
      <nav>
        <div class="title">${this.navbarTitle}</div>
        <div class="links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>
      </nav>
    `;
	}
}

customElements.define("eltrue-navbar", NavBar);
