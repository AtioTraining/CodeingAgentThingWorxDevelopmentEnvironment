
# Widget Layout Recipes

## Standard Widget Recipes
For standard input widgets, use the following configurations to ensure compatibility and correct rendering.

### 1. Numeric Input (legacy: `numericentry`)
For numeric inputs, use the **legacy** `numericentry` widget type (all lowercase).
**Crucial Properties:**
- `ResponsiveLayout`: `false`
- `Width`: Explicit value (e.g., `200`)
- `Height`: Explicit value (e.g., `30`)
- `Style`: `"DefaultTextBoxStyle"`
- `NumericEntryLabelStyle`: `"DefaultWidgetLabelStyle"`
- `NumericEntryFocusStyle`: `"DefaultFocusStyle"`

**Example JSON:**
```json
{
    "Properties": {
        "Type": "numericentry",
        "Id": "numericentry-1", // Use lowercase prefix
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
```

### 2. Radio Button (modern: `ptcsradio`)
For radio buttons, use the `ptcsradio` widget type.
**Crucial Properties:**
- `ResponsiveLayout`: `false` (Recommended for safety in mixed layouts)
- `Width`: Explicit value (e.g., `200`)
- `Height`: Explicit value (e.g., `30`)

**Example JSON:**
```json
{
    "Properties": {
        "Type": "ptcsradio",
        "Id": "ptcsradio-1",
        "Label": "Radio Option",
        "Visible": true,
        "ResponsiveLayout": false,
        "Width": 200,
        "Height": 30
    },
    "Widgets": []
}
```

### 3. Other Modern Widgets (`ptcs*`)
Standard modern widgets usually work with `ResponsiveLayout: true` (default in flex containers), but can be constrained if needed.
- **Button**: `ptcsbutton`
- **TextField**: `ptcstextfield`

### 4. Toggle Button (`ptcstogglebutton`)
Used for On/Off switches.
**Properties:**
- `State`: `true` or `false` (The value).
- `LabelAlignment`: `"right"` (Places text next to switch).

**Example JSON:**
```json
{
    "Properties": {
        "Type": "ptcstogglebutton",
        "Id": "ptcstogglebutton-1",
        "Label": "Toggle Feature",
        "LabelAlignment": "right",
        "State": false,
        "Visible": true
    },
    "Widgets": []
}
```
