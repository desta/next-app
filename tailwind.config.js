import { nextui } from "@nextui-org/react";
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    require('@tailwindcss/typography'),
    nextui({
    themes: {
      light: {
        extend: "light", // <- inherit default values from dark theme
        colors: {
          navbar: {
            DEFAULT: "#2962ff",
            foreground: "#ffffff",
          },
          sidebar: {
            DEFAULT: "#2962ff",
            foreground: "#ffffff",
            hover: "#000000",
          },
          primary: {
            '50': '#eff6ff',
            '100': '#dbeafe',
            '200': '#bfdbfe',
            '300': '#93c5fd',
            '400': '#60a5fa',
            '500': '#3b82f6',
            '600': '#2563eb',
            '700': '#1d4ed8',
            '800': '#1e40af',
            '900': '#1e3a8a',
            DEFAULT: "#2962ff",
            foreground: "#000000",
            button: "#ffffff",
          },
          secondary: {
            DEFAULT: "#2962ff",
            foreground: "#ffffff",
          }
        },
      },
      grey: {
        extend: "light",
        colors: {
          navbar: {
            DEFAULT: "#9e9e9e",
            foreground: "#000000",
          },
          sidebar: {
            DEFAULT: "#9e9e9e",
            foreground: "#000000",
            hover: "#000000",
          },
          primary: {
            '50': '#fafafa',
            '100': '#f5f5f5',
            '200': '#e5e5e5',
            '300': '#d4d4d4',
            '400': '#a3a3a3',
            '500': '#737373',
            '600': '#525252',
            '700': '#404040',
            '800': '#262626',
            '900': '#171717',
            DEFAULT: "#9e9e9e",
            foreground: "#000000",
            button: "#000000",
          },
          secondary: {
            DEFAULT: "#9e9e9e",
            foreground: "#000000",
          }
        },
      },
      red: {
        extend: "light",
        colors: {
          navbar: {
            DEFAULT: "#d50000",
            foreground: "#ffffff",
          },
          sidebar: {
            DEFAULT: "#d50000",
            foreground: "#ffffff",
            hover: "#000000",
          },
          primary: {
            '50': '#fef2f2',
            '100': '#fee2e2',
            '200': '#fecaca',
            '300': '#fca5a5',
            '400': '#f87171',
            '500': '#ef4444',
            '600': '#dc2626',
            '700': '#b91c1c',
            '800': '#991b1b',
            '900': '#7f1d1d',
            DEFAULT: "#f44336",
            foreground: "#000000",
            button: "#ffffff",
          },
          secondary: {
            DEFAULT: "#d50000",
            foreground: "#ffffff",
          }
        },
      },
      purple: {
        extend: "light", // <- inherit default values from dark theme
        colors: {
          navbar: {
            DEFAULT: "#9c27b0",
            foreground: "#ffffff",
          },
          sidebar: {
            DEFAULT: "#9c27b0",
            foreground: "#ffffff",
            hover: "#000000",
          },
          primary: {
            '50': '#faf5ff',
            '100': '#f3e8ff',
            '200': '#e9d5ff',
            '300': '#d8b4fe',
            '400': '#c084fc',
            '500': '#a855f7',
            '600': '#9333ea',
            '700': '#7e22ce',
            '800': '#6b21a8',
            '900': '#581c87',
            DEFAULT: "#9c27b0",
            foreground: "#000000",
            button: "#ffffff",
          },
          secondary: {
            DEFAULT: "#9c27b0",
            foreground: "#ffffff",
          }
        },
      },
      deep_purple: {
        extend: "light", // <- inherit default values from dark theme
        colors: {
          navbar: {
            DEFAULT: "#673ab7",
            foreground: "#ffffff",
          },
          sidebar: {
            DEFAULT: "#673ab7",
            foreground: "#ffffff",
            hover: "#000000",
          },
          primary: {
            '50': '#ede7f6',
            '100': '#d1c4e9',
            '200': '#b39ddb',
            '300': '#9575cd',
            '400': '#7e57c2',
            '500': '#673ab7',
            '600': '#5e35b1',
            '700': '#512da8',
            '800': '#4527a0',
            '900': '#311b92',
            DEFAULT: "#673ab7",
            foreground: "#000000",
            button: "#ffffff",
          },
          secondary: {
            DEFAULT: "#673ab7",
            foreground: "#ffffff",
          }
        },
      },
      indigo: {
        extend: "light", // <- inherit default values from dark theme
        colors: {
          navbar: {
            DEFAULT: "#3f51b5",
            foreground: "#ffffff",
          },
          sidebar: {
            DEFAULT: "#3f51b5",
            foreground: "#ffffff",
            hover: "#000000",
          },
          primary: {
            '50': '#eef2ff',
            '100': '#e0e7ff',
            '200': '#c7d2fe',
            '300': '#a5b4fc',
            '400': '#818cf8',
            '500': '#6366f1',
            '600': '#4f46e5',
            '700': '#4338ca',
            '800': '#3730a3',
            '900': '#312e81',
            DEFAULT: "#3f51b5",
            foreground: "#000000",
            button: "#ffffff",
          },
          secondary: {
            DEFAULT: "#3f51b5",
            foreground: "#ffffff",
          }
        },
      },
      green: {
        extend: "light", // <- inherit default values from dark theme
        colors: {
          navbar: {
            DEFAULT: "#4caf50",
            foreground: "#ffffff",
          },
          sidebar: {
            DEFAULT: "#4caf50",
            foreground: "#ffffff",
            hover: "#000000",
          },
          primary: {
            '50': '#f0fdf4',
            '100': '#dcfce7',
            '200': '#bbf7d0',
            '300': '#86efac',
            '400': '#4ade80',
            '500': '#22c55e',
            '600': '#16a34a',
            '700': '#15803d',
            '800': '#166534',
            '900': '#14532d',
            DEFAULT: "#4caf50",
            foreground: "#000000",
            button: "#ffffff",
          },
          secondary: {
            DEFAULT: "#4caf50",
            foreground: "#ffffff",
          }
        },
      },
      blue: {
        extend: "light", // <- inherit default values from dark theme
        colors: {
          navbar: {
            DEFAULT: "#2962ff",
            foreground: "#ffffff",
          },
          sidebar: {
            DEFAULT: "#2962ff",
            foreground: "#ffffff",
            hover: "#000000",
          },
          primary: {
            '50': '#eff6ff',
            '100': '#dbeafe',
            '200': '#bfdbfe',
            '300': '#93c5fd',
            '400': '#60a5fa',
            '500': '#3b82f6',
            '600': '#2563eb',
            '700': '#1d4ed8',
            '800': '#1e40af',
            '900': '#1e3a8a',
            DEFAULT: "#2962ff",
            foreground: "#000000",
            button: "#ffffff",
          },
          secondary: {
            DEFAULT: "#2962ff",
            foreground: "#ffffff",
          }
        },
      },
      pink: {
        extend: "light", // <- inherit default values from dark theme
        colors: {
          navbar: {
            DEFAULT: "#e91e63",
            foreground: "#ffffff",
          },
          sidebar: {
            DEFAULT: "#e91e63",
            foreground: "#ffffff",
            hover: "#000000",
          },
          primary: {
            '50': '#fdf2f8',
            '100': '#fce7f3',
            '200': '#fbcfe8',
            '300': '#f9a8d4',
            '400': '#f472b6',
            '500': '#ec4899',
            '600': '#db2777',
            '700': '#be185d',
            '800': '#9d174d',
            '900': '#831843',
            DEFAULT: "#e91e63",
            foreground: "#000000",
            button: "#ffffff",
          },
          secondary: {
            DEFAULT: "#e91e63",
            foreground: "#ffffff",
          }
        },
      },
      orange: {
        extend: "light", // <- inherit default values from dark theme
        colors: {
          navbar: {
            DEFAULT: "#ff3d00",
            foreground: "#ffffff",
          },
          sidebar: {
            DEFAULT: "#ff3d00",
            foreground: "#ffffff",
            hover: "#000000",
          },
          primary: {
            '50': '#fbe9e7',
            '100': '#ffccbc',
            '200': '#ffab91',
            '300': '#ff8a65',
            '400': '#ff7043',
            '500': '#ff5722',
            '600': '#f4511e',
            '700': '#e64a19',
            '800': '#d84315',
            '900': '#bf360c',
            DEFAULT: "#ff3d00",
            foreground: "#000000",
            button: "#ffffff",
          },
          secondary: {
            DEFAULT: "#ff3d00",
            foreground: "#ffffff",
          }
        },
      },
    },
  })],
};
