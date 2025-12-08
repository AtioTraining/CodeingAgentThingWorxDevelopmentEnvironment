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

async function inspect() {
    console.log(`Inspecting EntityServices...`);

    // List ThingTemplates
    console.log("Listing ThingTemplates...");
    const response = await fetch(`${BASE_URL}/ThingTemplates`, {
        method: 'GET',
        headers: {
            'appKey': APP_KEY,
            'Accept': 'application/json'
        }
    });

    if (!response.ok) {
        console.error(`Failed to list templates: ${response.status}`);
    } else {
        const data = await response.json();
        if (data.rows) {
            data.rows.forEach(row => {
                if (row.name.includes("Mashup")) {
                    console.log(`Template: ${row.name}`);
                }
            });
        }
    }
}

inspect();
