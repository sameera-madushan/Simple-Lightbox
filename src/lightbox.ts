import type { LightboxOptions } from "../types/lightbox";

const svg = {
  close: `<svg width="20" height="20" viewBox="0 0 20 20"><line stroke="#fff" x1="1" y1="1" x2="19" y2="19"/><line stroke="#fff" x1="19" y1="1" x2="1" y2="19"/></svg>`,
  prev: `<svg width="14" height="24" viewBox="0 0 14 24"><polyline fill="none" stroke="#fff" stroke-width="1.4" points="12.8,1 1.2,12 12.8,23"/></svg>`,
  next: `<svg width="14" height="24" viewBox="0 0 14 24"><polyline fill="none" stroke="#fff" stroke-width="1.4" points="1.2,23 12.8,12 1.2,1"/></svg>`,
};

export class Lightbox {
  private images: HTMLImageElement[];
  private overlay = this.createOverlay();
  private imgEl!: HTMLImageElement;
  private index = 0;
  private animationDuration = 300;
  private scrollY = 0;

  private options: Required<LightboxOptions> = {
    overlayColor: "",
    closeButton: true,
    keyboard: true,
    navigation: true,
  };

  constructor(selector: string, options: LightboxOptions = {}) {
    this.images = Array.from(document.querySelectorAll(selector)).filter(
      (el): el is HTMLImageElement => el instanceof HTMLImageElement
    );
    this.options = { ...this.options, ...options };
    this.bindThumbnails();
  }

  /* ---------- setup ---------- */

  private bindThumbnails() {
    this.images.forEach((img, i) => {
      img.style.cursor = "pointer";
      img.onclick = () => this.open(i);
    });
  }

  private createOverlay() {
    const el = document.createElement("div");
    el.className = "slb-overlay";
    el.onclick = (e) => e.target === el && this.close();
    document.body.appendChild(el);
    return el;
  }

  /* ---------- open / close / destroy ---------- */

  private open(i: number) {
    this.index = i;
    this.overlay.innerHTML = "";
    this.overlay.style.background = this.options.overlayColor;

    this.imgEl = this.createImage();
    this.overlay.append(this.imgEl);

    if (this.options.closeButton) this.overlay.append(this.button("slb-close", svg.close, this.close));

    if (this.options.navigation && this.images.length > 1) {
      this.overlay.append(this.nav("slb-prev", -1), this.nav("slb-next", 1));
    }

    this.show();
    this.options.keyboard && document.addEventListener("keydown", this.onKey);
    this.imgEl.style.cursor = "zoom-in";
    this.lockScroll();
  }

  private close = () => {
    this.overlay.style.opacity = "0";
    this.unlockScroll();
    document.removeEventListener("keydown", this.onKey);
    setTimeout(() => (this.overlay.style.display = "none"), this.animationDuration);
  };

  public destroy() {

    this.unlockScroll();

    if (this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay);
    }

    document.removeEventListener("keydown", this.onKey);
    this.images.forEach(img => (img.onclick = null));

    this.images = [];
    this.imgEl = null!;
  }


  /* ---------- elements ---------- */

  private createImage() {
    const img = document.createElement("img");
    img.classList.add("slb-img");
    const spinner = document.createElement("div");
    spinner.className = "slb-spinner";
    this.overlay.appendChild(spinner);

    img.src = this.images[this.index].src;
    img.onload = () => {
      spinner.remove();
    };
    img.onerror = () => {
      spinner.remove();
      img.alt = "Failed to load image";
    };

    this.enableZoom(img);
    return img;
  }


  private button(cls: string, html: string, cb: () => void) {
    const b = document.createElement("button");
    b.className = cls;
    b.innerHTML = html;
    b.onclick = (e) => (e.stopPropagation(), cb());
    return b;
  }

  private nav(cls: string, step: number) {
    return this.button(cls, step > 0 ? svg.next : svg.prev, () => this.change(step));
  }

  /* ---------- behavior ---------- */

  private show() {
    this.overlay.style.display = "flex";
    requestAnimationFrame(() => (this.overlay.style.opacity = "1"));
  }

  private change(step: number) {
    this.index = (this.index + step + this.images.length) % this.images.length;
    this.imgEl.classList.remove("active");
    void this.imgEl.offsetWidth;
    this.imgEl.src = this.images[this.index].src;
    this.imgEl.classList.add("active");
  }

  private enableZoom(img: HTMLImageElement) {
    let zoom = false;

    img.style.cursor = "zoom-in";
    img.onclick = (e) => {
      e.stopPropagation();
      zoom = !zoom;
      img.style.transform = `scale(${zoom ? 2 : 1})`;
      img.style.cursor = zoom ? "zoom-out" : "zoom-in";
      this.overlay.style.overflow = zoom ? "auto" : "hidden";
    };
  }

  private onKey = (e: KeyboardEvent) =>
    e.key === "Escape"
      ? this.close()
      : e.key === "ArrowRight"
      ? this.change(1)
      : e.key === "ArrowLeft"
      ? this.change(-1)
      : null;

  private lockScroll() {
    this.scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${this.scrollY}px`;
    document.body.style.width = "100%";
  }

  private unlockScroll() {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, this.scrollY);
  }
}
