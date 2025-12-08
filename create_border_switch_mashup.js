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
const MASHUP_NAME = "antigravity.border-switch-mu";

async function createMashup() {
    console.log(`Creating Mashup: ${MASHUP_NAME}...`);

    const mashupContent = {
        "UI": {
            "Properties": {
                "Id": "mashup-root",
                "Type": "mashup",
                "ResponsiveLayout": true,
                "Width": 1024,
                "Height": 618,
                "Style": "DefaultMashupStyle",
                "StyleTheme": "PTC Convergence Theme",
                "Title": "Border Layout Switch Mashup",
                "Area": "Mashup",
                "__TypeDisplayName": "Mashup",
                "Visible": true,
                "Z-index": 10,
                "Top": 0,
                "Left": 0,
                "Master": "antigravity.Master-mm"
            },
            "Widgets": [
                {
                    "Properties": {
                        "Type": "flexcontainer",
                        "__TypeDisplayName": "Responsive Container",
                        "Id": "flexcontainer-root",
                        "DisplayName": "root-column",
                        "flex-direction": "column",
                        "align-items": "stretch",
                        "justify-content": "flex-start",
                        "flex-grow": 1,
                        "ResponsiveLayout": true,
                        "LastContainer": true
                    },
                    "Widgets": [
                        // 1. TOP CONTAINER (Fixed 100px Height)
                        {
                            "Properties": {
                                "Type": "flexcontainer",
                                "__TypeDisplayName": "Responsive Container",
                                "Id": "flexcontainer-top",
                                "DisplayName": "container-top",
                                "ResponsiveLayout": false,
                                "Height": 100,
                                "MinHeight": 100,
                                "MaxHeight": 100,
                                "flex-grow": 0,
                                "flex-shrink": 0,
                                "flex-basis": "100px",
                                "flex-min-height": "100px",
                                "flex-max-height": "100px",
                                "Style": "DefaultContainerStyle"
                            },
                            "Widgets": []
                        },
                        // 2. MIDDLE ROW (Flexible Height)
                        {
                            "Properties": {
                                "Type": "flexcontainer",
                                "__TypeDisplayName": "Responsive Container",
                                "Id": "flexcontainer-middle-row",
                                "DisplayName": "container-middle-row",
                                "flex-direction": "row", // Horizontal
                                "align-items": "stretch",
                                "justify-content": "flex-start",
                                "flex-grow": 1,
                                "ResponsiveLayout": true
                            },
                            "Widgets": [
                                // 2a. LEFT CONTAINER (Fixed 100px Width)
                                {
                                    "Properties": {
                                        "Type": "flexcontainer",
                                        "__TypeDisplayName": "Responsive Container",
                                        "Id": "flexcontainer-left",
                                        "DisplayName": "container-left",
                                        "ResponsiveLayout": false,
                                        "Width": 100,
                                        "MinWidth": 100,
                                        "MaxWidth": 100,
                                        "flex-grow": 0,
                                        "flex-shrink": 0,
                                        "flex-basis": "100px",
                                        "flex-min-width": "100px",
                                        "flex-max-width": "100px",
                                        "Style": "DefaultContainerStyle"
                                    },
                                    "Widgets": []
                                },
                                // 2b. CENTER CONTAINER (Flexible Width)
                                {
                                    "Properties": {
                                        "Type": "flexcontainer",
                                        "__TypeDisplayName": "Responsive Container",
                                        "Id": "flexcontainer-center",
                                        "DisplayName": "container-center",
                                        "flex-direction": "column",
                                        "align-items": "center",
                                        "justify-content": "center",
                                        "flex-grow": 1,
                                        "ResponsiveLayout": true
                                    },
                                    "Widgets": [
                                        // The Radio Button
                                        {
                                            "Properties": {
                                                "Type": "ptcsradio",
                                                "__TypeDisplayName": "Radio Button",
                                                "Id": "ptcsradio-switch",
                                                "DisplayName": "RadioSwitch",
                                                "Label": "An/Aus",
                                                "Width": 200,
                                                "Height": 34,
                                                "ResponsiveLayout": false,
                                                "Visible": true
                                            },
                                            "Widgets": []
                                        }
                                    ]
                                },
                                // 2c. RIGHT CONTAINER (Fixed 100px Width)
                                {
                                    "Properties": {
                                        "Type": "flexcontainer",
                                        "__TypeDisplayName": "Responsive Container",
                                        "Id": "flexcontainer-right",
                                        "DisplayName": "container-right",
                                        "ResponsiveLayout": false,
                                        "Width": 100,
                                        "MinWidth": 100,
                                        "MaxWidth": 100,
                                        "flex-grow": 0,
                                        "flex-shrink": 0,
                                        "flex-basis": "100px",
                                        "flex-min-width": "100px",
                                        "flex-max-width": "100px",
                                        "Style": "DefaultContainerStyle"
                                    },
                                    "Widgets": []
                                }
                            ]
                        },
                        // 3. BOTTOM CONTAINER (Fixed 100px Height)
                        {
                            "Properties": {
                                "Type": "flexcontainer",
                                "__TypeDisplayName": "Responsive Container",
                                "Id": "flexcontainer-bottom",
                                "DisplayName": "container-bottom",
                                "ResponsiveLayout": false,
                                "Height": 100,
                                "MinHeight": 100,
                                "MaxHeight": 100,
                                "flex-grow": 0,
                                "flex-shrink": 0,
                                "flex-basis": "100px",
                                "flex-min-height": "100px",
                                "flex-max-height": "100px",
                                "Style": "DefaultContainerStyle"
                            },
                            "Widgets": []
                        }
                    ]
                }
            ]
        },
        "Data": {
            "Session": {
                "DataName": "Session",
                "EntityName": "",
                "EntityType": "Session",
                "Id": "session",
                "Services": [{
                    "Id": "SessionInterface",
                    "Name": "GetGlobalSessionValues",
                    "Characteristic": "Services",
                    "Target": "GetGlobalSessionValues",
                    "APIMethod": "post",
                    "RefreshInterval": 0,
                    "Parameters": {}
                }]
            },
            "UserExtensions": {
                "DataName": "UserExtensions",
                "EntityName": "",
                "EntityType": "UserExtensions",
                "Id": "UserExtensions",
                "Services": [{
                    "Id": "UserExtensionInterface",
                    "Name": "GetCurrentUserExtensionProperties",
                    "Characteristic": "Services",
                    "Target": "GetCurrentUserExtensionProperties",
                    "APIMethod": "post",
                    "RefreshInterval": 0,
                    "Parameters": {}
                }]
            }
        },
        "Events": [],
        "DataBindings": [],
        "mashupType": "mashup"
    };

    const payload = {
        "entityType": "Mashups",
        "name": MASHUP_NAME,
        "description": "Border Layout Mashup with Switch",
        "configurationTables": {
            "MobileSettings": {
                "name": "MobileSettings",
                "isHidden": true,
                "dataShape": {
                    "fieldDefinitions": {
                        "initialScale": { "baseType": "NUMBER", "name": "initialScale", "aspects": { "defaultValue": 1 } },
                        "width": { "baseType": "STRING", "name": "width", "aspects": { "defaultValue": "device-width" } },
                        "height": { "baseType": "STRING", "name": "height", "aspects": { "defaultValue": "device-height" } },
                        "minimumScale": { "baseType": "NUMBER", "name": "minimumScale", "aspects": { "defaultValue": 0.1 } },
                        "maximumScale": { "baseType": "NUMBER", "name": "maximumScale", "aspects": { "defaultValue": 10 } },
                        "disableZoom": { "baseType": "BOOLEAN", "name": "disableZoom", "aspects": { "defaultValue": false } },
                        "fullScreenMode": { "baseType": "BOOLEAN", "name": "fullScreenMode", "aspects": { "defaultValue": true } },
                        "iosStatusBarAppearance": { "baseType": "STRING", "name": "iosStatusBarAppearance", "aspects": { "defaultValue": "default" } },
                        "iosShortcutIconTitle": { "baseType": "STRING", "name": "iosShortcutIconTitle", "aspects": { "defaultValue": "" } }
                    }
                },
                "rows": [{
                    "initialScale": 1,
                    "width": "device-width",
                    "height": "device-height",
                    "minimumScale": 0.1,
                    "maximumScale": 10,
                    "disableZoom": false,
                    "fullScreenMode": true,
                    "iosStatusBarAppearance": "black-translucent",
                    "iosShortcutIconTitle": ""
                }]
            }
        },
        "aspects": {
            "mashupType": "mashup",
            "isResponsive": true,
            "isFlex": true
        },
        "mashupContent": JSON.stringify(mashupContent),
        "projectName": "PTCDefaultProject"
    };

    const url = `${BASE_URL}/Mashups?Content-Type=application%2Fjson&reason=created%20by%20Antigravity`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'appKey': APP_KEY,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const text = await response.text();
        console.error(`Failed to create mashup: ${response.status} ${response.statusText}`);
        console.error(text);
    } else {
        console.log(`✓ Mashup '${MASHUP_NAME}' created successfully!`);
        console.log(`  View it at: ${BASE_URL}/Mashups/${MASHUP_NAME}`);
    }
}

createMashup();
