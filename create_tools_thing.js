const fs = require('fs');
const path = require('path');

// Load config
const envPath = path.join(__dirname, '.env.example');
const envContent = fs.readFileSync(envPath, 'utf8');
const config = {};
envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) config[key.trim()] = value.trim();
});

const BASE_URL = config.THINGWORX_BASE_URL;
const APP_KEY = config.THINGWORX_APP_KEY;
const THING_NAME = "Antigravity.Tools";

async function createToolsThing() {
    console.log(`Creating Thing: ${THING_NAME}...`);

    const response = await fetch(`${BASE_URL}/Resources/EntityServices/Services/CreateThing`, {
        method: 'POST',
        headers: {
            'appKey': APP_KEY,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: THING_NAME,
            description: "Tools for Antigravity Agent",
            thingTemplateName: "GenericThing"
        })
    });

    if (!response.ok) {
        const text = await response.text();
        // Ignore if it already exists
        if (response.status === 500 && text.includes("already exists")) {
            console.log("Thing already exists.");
        } else {
            console.error(`Failed to create Thing: ${response.status} ${response.statusText}`);
            console.error(text);
        }
    } else {
        console.log("Thing created successfully.");

        // We need to enable it? usually created enabled.
        // But we might need to restart it? No.

        // Enable the thing
        await fetch(`${BASE_URL}/Things/${THING_NAME}/Services/EnableThing`, {
            method: 'POST',
            headers: { 'appKey': APP_KEY, 'Accept': 'application/json' }
        });
    }
}

createToolsThing();
