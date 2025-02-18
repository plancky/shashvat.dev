window.accentColor = {
    set: () => {
        const { hue, saturation, lightness } = window.accentColor;
        const root = document.documentElement;
        const body = root.querySelector("body");
        const accent = `${hue} ${saturation}% ${lightness}%`;
        body.style.setProperty("--accent", accent);
        body.style.setProperty("--accent-foreground", accent);
    },
    gen: () => {
        window.accentColor = {
            ...window.accentColor,
            hue: Math.floor(Math.random() * 360),
            saturation: 100,
        };
        window.accentColor.lightness = window.accentColor.get_lightness()
    },
    get_lightness: () => {
        return document.querySelector("body").classList.contains("dark") ? 45 : 14;
    },
};

window.accentColor.gen();
window.accentColor.set();
