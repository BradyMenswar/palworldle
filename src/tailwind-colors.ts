interface ColorShades {
    [key: number]: string; // Define that each key is a number, with string values (hex codes)
  }
  
  interface ThemeColors {
    [key: string]: ColorShades; // Each color can have multiple shades
  }
  
  interface Theme {
    colors: ThemeColors;
  }

const theme: Theme = {
    colors: {
        "county-green": {
          50: "#f2fbf4",
          100: "#e1f7e5",
          200: "#c4eecc",
          300: "#96dfa4",
          400: "#60c876",
          500: "#3aad52",
          600: "#2b8e3f",
          700: "#257035",
          800: "#22592e",
          900: "#1d4a28",
          950: "#0f3619",
        },
        geraldine: {
            50: "#fef2f2",
            100: "#ffe1e1",
            200: "#ffc8c8",
            300: "#ffa2a3",
            400: "#fd8182",
            500: "#f53e3f",
            600: "#e22022",
            700: "#be1718",
            800: "#9d1718",
            900: "#821a1b",
            950: "#470809",
          },
        shalimar: {
            50: "#fafcea",
            100: "#f4f9c8",
            200: "#f2f7ab",
            300: "#eaee56",
            400: "#e8e527",
            500: "#d8cd1a",
            600: "#baa314",
            700: "#957813",
            800: "#7b5e18",
            900: "#694e1a",
            950: "#3d2a0b",
          },
        
    }
}

export default theme