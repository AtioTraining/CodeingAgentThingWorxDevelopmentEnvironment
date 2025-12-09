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

async function inspectMashup() {
    const mashupName = "hs.rechner-mu";
    console.log(`Inspecting Mashup: ${mashupName}...`);

    const response = await fetch(`${BASE_URL}/Mashups/${mashupName}`, {
        method: 'GET',
        headers: {
            'appKey': APP_KEY,
            'Accept': 'application/json'
        }
    });

    if (!response.ok) {
        console.error(`Failed: ${response.status} ${response.statusText}`);
        return;
    }

    const data = await response.json();
    const mashupContent = JSON.parse(data.mashupContent);

    console.log('\n=== EVENTS ===');
    console.log(JSON.stringify(mashupContent.Events, null, 2));

    console.log('\n=== DATA BINDINGS ===');
    console.log(JSON.stringify(mashupContent.DataBindings, null, 2));

    console.log('\n=== DATA SECTION ===');
    console.log(JSON.stringify(mashupContent.Data, null, 2));

    // Save to file
    fs.writeFileSync('mashup_rechner_example.json', JSON.stringify(mashupContent, null, 2));
    console.log('\n✓ Saved to mashup_rechner_example.json');
}

inspectMashup();
