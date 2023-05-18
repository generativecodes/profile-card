const profileCardConfig = {
    profile: {
        picture: "http://placekitten.com/g/200/300",
        headline: "Kitten",
        description: "Your description goes here...Your description goes here...",
    },
    personalLinks: [
        { text: "Portfolio", url: "#" },
        { text: "Contact", url: "#" },
    ],
    socialLinks: [
        { icon: "logo-github", url: "#" },
        { icon: "logo-mastodon", url: "#" },
        { icon: "logo-twitter", url: "#" },
        { icon: "logo-instagram", url: "#" },
    ],
    themes: {
        light: {
            "--bg-color": "#fff",
            "--text-color": "#000",
            "--card-bg-color": "#e4e4e4",
            "--accent-color": "#007BFF",
        },
        dark: {
            "--bg-color": "#1a1a1a",
            "--text-color": "#fff",
            "--card-bg-color": "#333",
            "--accent-color": "#00BCD4",
        },
    },
};

export { profileCardConfig };