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
const MASHUP_NAME = "antigravity.test-mu";

async function createMashup() {
    console.log(`Creating Mashup: ${MASHUP_NAME}...`);

    // Build the mashupContent with a centered "Hello World" label
    const mashupContent = {
        "UI": {
            "Properties": {
                "Area": "Mashup",
                "Style": "DefaultMashupStyle",
                "ShowDataLoading": true,
                "Visible": true,
                "Z-index": 10,
                "Id": "mashup-root",
                "DisplayName": "Mashup",
                "Top": 0,
                "Left": 0,
                "supportsAutoResize": true,
                "id_index": 2,
                "Type": "mashup",
                "__TypeDisplayName": "Mashup",
                "Width": 1024,
                "Height": 618,
                "MinWidth": 0,
                "MinHeight": 0,
                "IgnoreWarningsInViewMashup": false,
                "ResponsiveLayout": true,
                "Title": "",
                "TitleBar": false,
                "TitleBarText": "Gadget Title Here",
                "MashupToEditGadget": "DefaultMashupToEditGadget",
                "EnableParameterEditing": false,
                "Columns": 0,
                "Rows": 0,
                "TitleBarStyle": "DefaultTitleBarStyle",
                "AddToDashboardButtonStyle": "DefaultAddToDashboardButtonStyle",
                "ConfigureGadgetButtonStyle": "DefaultConfigureGadgetButtonStyle",
                "BGImageRepeat": "no-repeat",
                "BGImageSize": "auto",
                "IsPrintLayout": false,
                "UseThemeForHybrids": false,
                "StyleTheme": "PTC Convergence Theme"
            },
            "Widgets": [
                {
                    "Properties": {
                        "Id": "Label-1",
                        "Type": "Label",
                        "DisplayName": "lblHelloWorld",
                        "Text": "Hello World",
                        "Style": "DefaultLabelStyle",
                        "Visible": true,
                        "Width": 200,
                        "Height": 30,
                        "Top": 294,
                        "Left": 412,
                        "Z-index": 100,
                        "Alignment": "center"
                    }
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
        "DesignTimePermissions": {},
        "RunTimePermissions": {},
        "CustomMashupCss": "",
        "mashupType": "mashup"
    };

    const payload = {
        "entityType": "Mashups",
        "configurationTables": {
            "MobileSettings": {
                "description": "",
                "isMultiRow": false,
                "name": "MobileSettings",
                "isHidden": true,
                "dataShape": {
                    "description": "",
                    "name": "",
                    "fieldDefinitions": {
                        "initialScale": { "baseType": "NUMBER", "description": "", "name": "initialScale", "ordinal": 0, "aspects": { "defaultValue": 1 } },
                        "width": { "baseType": "STRING", "description": "", "name": "width", "ordinal": 0, "aspects": { "defaultValue": "device-width" } },
                        "height": { "baseType": "STRING", "description": "", "name": "height", "ordinal": 0, "aspects": { "defaultValue": "device-height" } },
                        "minimumScale": { "baseType": "NUMBER", "description": "", "name": "minimumScale", "ordinal": 0, "aspects": { "defaultValue": 0.1 } },
                        "maximumScale": { "baseType": "NUMBER", "description": "", "name": "maximumScale", "ordinal": 0, "aspects": { "defaultValue": 10 } },
                        "disableZoom": { "baseType": "BOOLEAN", "description": "", "name": "disableZoom", "ordinal": 0, "aspects": { "defaultValue": false } },
                        "fullScreenMode": { "baseType": "BOOLEAN", "description": "", "name": "fullScreenMode", "ordinal": 0, "aspects": { "defaultValue": true } },
                        "iosStatusBarAppearance": { "baseType": "STRING", "description": "", "name": "iosStatusBarAppearance", "ordinal": 0, "aspects": { "defaultValue": "default" } },
                        "iosShortcutIconTitle": { "baseType": "STRING", "description": "", "name": "iosShortcutIconTitle", "ordinal": 0, "aspects": { "defaultValue": "" } }
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
        "designTimePermissions": { "Delete": [], "Read": [], "Update": [], "Create": [] },
        "description": "Test mashup created by Antigravity Agent",
        "documentationContent": "",
        "homeMashup": "",
        "tags": [],
        "things": [],
        "thingTemplates": [],
        "dataShapes": [],
        "thingShapes": [],
        "parameterDefinitions": [],
        "isSystemObject": false,
        "rows": 0,
        "columns": 0,
        "avatar": "",
        "name": MASHUP_NAME,
        "runTimePermissions": { "permissions": [] },
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
