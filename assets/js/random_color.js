window.accentColor = {
    gen: () => {
        window.accentColor = {
            ...window.accentColor,
            hue: Math.floor(Math.random() * 360),
            saturation: 100,
        };
        window.accentColor.lightness = window.accentColor.get_lightness();
    },
    init: () => {
        if (localStorage) {
            const theme = localStorage.getItem("theme");
            if (theme == "light") {
                window.accentColor.toggle_theme();
            }
        }
    },
    set: () => {
        const { hue, saturation, lightness } = window.accentColor;
        const root = document.documentElement;
        const body = root.querySelector("body");
        const accent = `${hue} ${saturation}% ${lightness}%`;
        body.style.setProperty("--accent", accent);
        body.style.setProperty("--accent-foreground", accent);
    },
    toggle_theme: () => {
        document.querySelector("body").classList.toggle("dark");
        window.accentColor.store();

        window.accentColor.lightness = window.accentColor.get_lightness();
        window.accentColor.set();
    },
    get_lightness: () => {
        return window.accentColor.theme() == "dark" ? 45 : 14;
    },
    theme: () => {
        return document.querySelector("body").classList.contains("dark")
            ? "dark"
            : "light";
    },
    store: () => {
        localStorage.setItem("theme", window.accentColor.theme());
    },
};

window.accentColor.gen();
window.accentColor.init();
window.accentColor.set();
