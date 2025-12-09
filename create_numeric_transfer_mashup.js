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
const MASHUP_NAME = "antigravity.numeric-transfer-mu";

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
                "Title": "Numeric Transfer Mashup",
                "Area": "Mashup",
                "__TypeDisplayName": "Mashup",
                "Visible": true,
                "Z-index": 10,
                "Top": 0,
                "Left": 0
            },
            "Widgets": [
                {
                    "Properties": {
                        "Type": "flexcontainer",
                        "__TypeDisplayName": "Responsive Container",
                        "Id": "flexcontainer-root",
                        "DisplayName": "root-column",
                        "flex-direction": "column", // Vertical Layout
                        "align-items": "center",
                        "justify-content": "flex-start",
                        "flex-grow": 1,
                        "ResponsiveLayout": true,
                        "LastContainer": true
                    },
                    "Widgets": [
                        // 1. Top Container: Numeric Entry
                        {
                            "Properties": {
                                "Type": "flexcontainer",
                                "__TypeDisplayName": "Responsive Container",
                                "Id": "flexcontainer-1",
                                "DisplayName": "container-numeric",
                                "flex-direction": "column",
                                "align-items": "center",
                                "justify-content": "center",
                                "flex-grow": 1,
                                "ResponsiveLayout": true,
                                "Style": "DefaultContainerStyle"
                            },
                            "Widgets": [
                                {
                                    "Properties": {
                                        "Type": "numericentry",
                                        "Id": "numericentry-1",
                                        "DisplayName": "numeric-input-1",
                                        "Label": "Numeric Input",
                                        "Value": 0,
                                        "Visible": true,
                                        "ResponsiveLayout": false,
                                        "Width": 200,
                                        "Height": 30,
                                        "Style": "DefaultTextBoxStyle",
                                        "NumericEntryLabelStyle": "DefaultWidgetLabelStyle",
                                        "NumericEntryFocusStyle": "DefaultFocusStyle"
                                    },
                                    "Widgets": []
                                }
                            ]
                        },
                        // 2. Middle Container: Button "übertragen"
                        {
                            "Properties": {
                                "Type": "flexcontainer",
                                "__TypeDisplayName": "Responsive Container",
                                "Id": "flexcontainer-2",
                                "DisplayName": "container-button",
                                "flex-direction": "column",
                                "align-items": "center",
                                "justify-content": "center",
                                "flex-grow": 1,
                                "ResponsiveLayout": true,
                                "Style": "DefaultContainerStyle"
                            },
                            "Widgets": [
                                {
                                    "Properties": {
                                        "Type": "ptcsbutton",
                                        "Id": "ptcsbutton-1",
                                        "DisplayName": "btnTransfer",
                                        "Label": "übertragen",
                                        "ButtonType": "primary",
                                        "UseTheme": true,
                                        "Visible": true
                                    },
                                    "Widgets": []
                                }
                            ]
                        },
                        // 3. Bottom Container: Label "value"
                        {
                            "Properties": {
                                "Type": "flexcontainer",
                                "__TypeDisplayName": "Responsive Container",
                                "Id": "flexcontainer-3",
                                "DisplayName": "container-label",
                                "flex-direction": "column",
                                "align-items": "center",
                                "justify-content": "center",
                                "flex-grow": 1,
                                "ResponsiveLayout": true,
                                "Style": "DefaultContainerStyle"
                            },
                            "Widgets": [
                                {
                                    "Properties": {
                                        "Type": "ptcslabel",
                                        "Id": "ptcslabel-1",
                                        "DisplayName": "lblValue",
                                        "LabelText": "value", // Default text
                                        "HorizontalAlignment": "left",
                                        "VerticalAlignment": "flex-start",
                                        "UseTheme": true,
                                        "Visible": true
                                    },
                                    "Widgets": []
                                }
                            ]
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
        "DataBindings": [
            {
                "Id": "binding-numeric-to-label",
                "PropertyMaps": [
                    {
                        "SourceProperty": "Value",
                        "TargetProperty": "LabelText",
                        "SourcePropertyType": "Property",
                        "TargetPropertyType": "Property"
                    }
                ],
                "SourceArea": "UI",
                "SourceId": "numericentry-1",
                "SourceSection": "",
                "TargetArea": "UI",
                "TargetId": "ptcslabel-1",
                "TargetSection": "Properties"
            }
        ],
        "mashupType": "mashup"
    };

    const payload = {
        "entityType": "Mashups",
        "name": MASHUP_NAME,
        "description": "Numeric Transfer Mashup with 3 vertical containers",
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

    // DELETE existing mashup first
    try {
        console.log(`Deleting existing Mashup (if any): ${MASHUP_NAME}...`);
        await fetch(`${BASE_URL}/Mashups/${MASHUP_NAME}`, {
            method: 'DELETE',
            headers: {
                'appKey': APP_KEY,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    } catch (e) {
        // Ignore delete errors
    }

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
