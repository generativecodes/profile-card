import { profileCardConfig } from "./config.js";

class ProfileCard {
    constructor(profile, personalLinks, socialLinks, themes) {
        this.profile = profile;
        this.personalLinks = personalLinks;
        this.socialLinks = socialLinks;
        this.themes = themes;
    }

    setTheme(name) {
        const theme = this.themes[name];
        for (let prop in theme) {
            document.documentElement.style.setProperty(prop, theme[prop]);
        }
    }

    populateProfile() {
        const profileElem = document.getElementById('profile');
        profileElem.innerHTML = `
            <img src="${this.profile.picture}" alt="Profile Picture" >
            <h2>${this.profile.headline}</h2>
            <p>${this.profile.description}</p>
        `;
    }

    populatePersonalLinks() {
        const personalLinksElem = document.getElementById('personal-links');
        personalLinksElem.innerHTML = this.personalLinks.map(link => `
            <a href="${link.url}" title="${link.text}">
                <button>${link.text}</button>
            </a>
        `).join("");
    }

    populateSocialLinks() {
        const socialLinksElem = document.getElementById('social-links');
        socialLinksElem.innerHTML = this.socialLinks.map(link => `
            <a href="${link.url}" title="${link.icon}">
                <ion-icon name="${link.icon}"></ion-icon>
            </a>
        `).join("");
    }


    initializeThemeToggle(moon, sun) {

        moon.addEventListener('click', (e) => {
            this.setTheme('dark');
            moon.style.display = 'none';
            sun.style.display = 'block';
        });

        sun.addEventListener('click', (e) => {
            this.setTheme('light');
            sun.style.display = 'none';
            moon.style.display = 'block';
        });
    }

    initializeCardTransform() {
        const card = document.getElementById('card');

        let timeoutID;
        card.addEventListener('mouseenter', function (e) {
            timeoutID = setTimeout(() => {
                card.style.transition = 'none';
            }, 0);
        });

        card.addEventListener('mousemove', function (e) {
            const rect = card.getBoundingClientRect();
            const xAxis = ((e.pageY - rect.top) - rect.height / 2) / 20;
            const yAxis = (rect.width / 2 - (e.pageX - rect.left)) / 20;
            card.style.transform
                = `perspective(1000px) rotateX(${xAxis}deg) rotateY(${yAxis}deg)`;
        });

        card.addEventListener('mouseleave', function (e) {
            clearTimeout(timeoutID);
            card.style.transition = 'all 0.5s ease';
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        });
    }

    initialize() {
        const moon = document.getElementById('moon');
        const sun = document.getElementById('sun');

        const prefersDarkScheme = window
            .matchMedia("(prefers-color-scheme: dark)").matches;
        this.setTheme(prefersDarkScheme ? 'dark' : 'light');
        if (prefersDarkScheme) {
            moon.style.display = 'none';
            sun.style.display = 'block';
        } else {
            moon.style.display = 'block';
            sun.style.display = 'none';
        }
        this.populateProfile();
        this.populatePersonalLinks();
        this.populateSocialLinks();
        this.initializeThemeToggle(moon, sun);
        this.initializeCardTransform();
    }

}

const profileCard = new ProfileCard(
    profileCardConfig.profile,
    profileCardConfig.personalLinks,
    profileCardConfig.socialLinks,
    profileCardConfig.themes
);

document.addEventListener("DOMContentLoaded", function () {
    profileCard.initialize();
    document.body.style.display = ""; // Remove the inline style
});
