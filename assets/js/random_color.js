import { hsl2rgb, hslToRgb } from "./hsl_to_rgb.js";

document.addEventListener("DOMContentLoaded", function () {
    main();
    accentColor.init();
});

const main = () => {
    const o = {
        THEMES: {
            DARK: "dark",
            LIGHT: "light",
        },
        BODYCLSARR: document.querySelector("body").classList,
        MEDIA_PREFERS_DARK: window.matchMedia("(prefers-color-scheme: dark)"),
        gen_hsl_color: function () {
            this.hue = Math.floor(Math.random() * 360);
            this.saturation = 100;
            this.lightness = this.get_lightness();
        },
        get_colors: function () {
            const hsl = [this.hue, this.saturation, this.lightness];
            const rgb = hslToRgb(...hsl);
            return { hsl, rgb };
        },
        set_colors: function () {
            const { hue, saturation, lightness } = this;
            const root = document.documentElement;
            const body = root.querySelector("body");
            const accent = `${hue} ${saturation}% ${lightness}%`;
            body.style.setProperty("--accent", accent);
            body.style.setProperty("--accent-foreground", accent);
        },
        init: function () {
            this.set_theme(this.get_theme_preference());
            // lightness should only be calculated after the theme is loaded
            this.gen_hsl_color();
            this.set_colors();

            // handle theme-switch clicks
            document
                .querySelector("#theme-switch")
                .addEventListener("click", (e) => {
                    this.set_theme();
                });
        },
        theme: function () {
            return this.BODYCLSARR.contains(this.THEMES.DARK)
                ? this.THEMES.DARK
                : this.THEMES.LIGHT;
        },
        onThemeChange: function (callback) {
            document.documentElement.addEventListener("theme:change", (e) => {
                callback();
            });
        },
        set_theme: function (theme) {
            // if theme is passed then follow the correct branch, else the current theme is toggled.
            if (theme == this.THEMES.DARK) {
                this.BODYCLSARR.add(this.THEMES.DARK);
                this.lightness = this.DARK_L;
            } else if (theme == this.THEMES.LIGHT) {
                this.BODYCLSARR.remove(this.THEMES.DARK);
                this.lightness = this.LIGHT_L;
            } else {
                // if theme is not passed then just toggle.
                this.BODYCLSARR.toggle(this.THEMES.DARK);
                this.lightness = this.get_lightness();
            }

            this.store(theme); // store theme config in localStorage
            this.set_colors(); // set the css variables with new colors

            document.documentElement.dispatchEvent(
                new CustomEvent("theme:change"),
            ); // dispatch custom event that allows other elements to refresh colors
        },
        DARK_L: 45,
        LIGHT_L: 14,
        get_lightness: function () {
            return this.theme() == this.THEMES.DARK
                ? this.DARK_L
                : this.LIGHT_L;
        },
        // Check Storage theme settings and if not allowed check media preference
        get_theme_preference: function () {
            if (localStorage.getItem("theme")) {
                return localStorage.getItem("theme");
            } else if (this.MEDIA_PREFERS_DARK.matches) {
                return this.THEMES.DARK;
            } else {
                return this.THEMES.LIGHT;
            }
        },
        // Store theme preference on the localStorage
        store: function (theme) {
            if (localStorage) {
                localStorage.setItem("theme", theme ?? this.theme());
            }
        },
    };
    window.accentColor = o;
};
