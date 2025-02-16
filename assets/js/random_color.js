function set_random_color() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 100;
    const lightness = 45;

    const root = document.documentElement;
    const body = root.querySelector("body");
    const accent = `${hue} ${saturation}% ${lightness}%`;
    body.style.setProperty("--accent", `${hue} ${saturation}% ${lightness}%`);
    body.style.setProperty("--accent-foreground", `${hue} ${saturation}% ${lightness}%`);
    console.log(accent);
}

set_random_color();
