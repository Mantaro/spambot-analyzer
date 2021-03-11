export function setData(data) {
    localStorage.setItem("data", JSON.stringify(data));
}

export function getData() {
    const raw = localStorage.getItem("data");
    if(raw == null) return null;
    try {
        return JSON.parse(raw);
    } catch(ignored) {
        return null;
    }
}

export function clearData() {
    localStorage.removeItem("data");
}

const defaultSettings = {
    periodic: {
        minRepeated: 10,
        maxDelay: 30000
    }
};

export function saveSettings(settings) {
    localStorage.setItem("settings", JSON.stringify(settings));
}

export function getSettings() {
    const raw = localStorage.getItem("settings");
    if(raw == null) {
        const stringified = JSON.stringify(defaultSettings);
        localStorage.setItem("settings", stringified);
        return JSON.parse(stringified);
    }
    try {
        return JSON.parse(raw);
    } catch(ignored) {
        return JSON.parse(JSON.stringify(defaultSettings));
    }
}

export function clearSettings() {
    const s = localStorage.getItem("settings");
    if(s) localStorage.setItem("old-settings", s);
    localStorage.removeItem("settings")
}