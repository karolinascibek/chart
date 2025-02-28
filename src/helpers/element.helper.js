export default class HTMLElementHelper {
    static create(id, type) {
        const el = document.createElement(type);
        el.id = id;
        return el;
    }

    static setPosition(el, type, coords) {
        el.style.position = type;
        el.style.top = `${coords.top}px`;
        el.style.left = `${coords.left}px`;
    }

    static setWidth(el, width) {
        el.width = width;
    }

    static setHeight(el, height) {
        el.height = height;
    }

    static setBackground(el, color) {
        el.style.background = color;
    }
}