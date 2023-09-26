const HEADING_EXTRA_LARGE_SIZE = "12.8rem";
const HEADING_LARGE_SIZE = "6.4rem";
const HEADING_SUBLARGE_SIZE = "4.8rem";
const HEADING_SIZE = "3.2rem";
const SUBHEADING_SIZE = "2.4rem";
const BODY_SIZE = "1.8rem";

const LIGHTNESS_FACTOR = "40%";
const SATURATION_FACTOR = 30;

const PRIMARY_COLOR_HSL = "210.54, 69%";
const PRIMARY_COLOR_SHADOW = `${PRIMARY_COLOR_HSL.split(",")[0]}deg ${
  69 - SATURATION_FACTOR
}% ${LIGHTNESS_FACTOR}`;

const SECONDARY_COLOR_HSL = "44, 100%";
const SECONDARY_COLOR_SHADOW = `${SECONDARY_COLOR_HSL.split(",")[0]}deg ${
  100 - SATURATION_FACTOR
}% ${LIGHTNESS_FACTOR} `;

const TERTIARY_COLOR_HSL = "159, 93.2%";
const TERTIARY_COLOR_SHADOW = `${TERTIARY_COLOR_HSL.split(",")[0]}deg ${
  93.2 - SATURATION_FACTOR
}% ${LIGHTNESS_FACTOR} `;

const SUCCESS_COLOR_HSL = "120, 61%";
const SUCCESS_COLOR_SHADOW = `120deg ${
  61 - SATURATION_FACTOR
}% ${LIGHTNESS_FACTOR} `;

const ERROR_COLOR_HSL = "0, 80%";
const ERROR_COLOR_SHADOW = `0deg ${
  80 - SATURATION_FACTOR
}% ${LIGHTNESS_FACTOR} `;

const INFO_COLOR_HSL = "210.54, 69%";
const INFO_COLOR_SHADOW = `218.54deg ${
  70 - SATURATION_FACTOR
}% ${LIGHTNESS_FACTOR} `;

const WARNING_COLOR_HSL = "60, 90%";
const WARNING_COLOR_SHADOW = `60deg ${
  90 - SATURATION_FACTOR
}% ${LIGHTNESS_FACTOR} `;

const NEUTRAL_COLOR_HSL = `${PRIMARY_COLOR_HSL.split(",")[0]}, 15%`;
const NEUTRAL_COLOR_SHADOW = `${PRIMARY_COLOR_HSL.split(",")[0]}deg ${
  20 - SATURATION_FACTOR
}% ${LIGHTNESS_FACTOR} `;

const BLACK_COLOR_SHADOW = `0deg 0% ${LIGHTNESS_FACTOR}`;

function lowShadow(color) {
  return `0.8px 0.6px 1px hsl(${color} / 0.44),
  1.3px 0.9px 1.5px -1.8px hsl(${color} / 0.36),
  3.2px 2.4px 3.9px -3.5px hsl(${color} / 0.27)`;
}

function mediumShadow(color) {
  return `0.8px 0.6px 1px hsl(${color} / 0.37),
  1.7px 1.3px 2.1px -0.9px hsl(${color} / 0.33),
  3.5px 2.6px 4.2px -1.8px hsl(${color} / 0.28),
  7.8px 5.8px 9.4px -2.7px hsl(${color} / 0.24),
  15.9px 11.8px 19.2px -3.5px hsl(${color} / 0.2)`;
}

function highShadow(color) {
  return `0.8px 0.6px 1px hsl(${color} / 0.35),
  2.5px 1.9px 3px -0.4px hsl(${color} / 0.32),
  4.5px 3.3px 5.4px -0.8px hsl(${color} / 0.3),
  7.2px 5.4px 8.7px -1.2px hsl(${color} / 0.28),
  11.4px 8.5px 13.8px -1.6px hsl(${color} / 0.26),
  17.7px 13.2px 21.4px -2px hsl(${color} / 0.24),
  26.6px 19.8px 32.1px -2.4px hsl(${color} / 0.22),
  38.9px 29px 46.9px -2.8px hsl(${color} / 0.2),
  55px 41px 66.4px -3.2px hsl(${color} / 0.18),
  75.7px 56.4px 91.3px -3.5px hsl(${color} / 0.16)`;
}

function clayShadow(color) {
  return `16px 16px 30px 0px hsl(${color.split(",")[0]}deg ${
    PRIMARY_COLOR_HSL.split(",")[1]
  } ${LIGHTNESS_FACTOR} / 0.5),
  inset -2px -2px 16px 0px hsl(${color.split(",")[0]}deg ${
    PRIMARY_COLOR_HSL.split(",")[1]
  } ${LIGHTNESS_FACTOR} / 0.6),
  inset 0px 11px 28px 0px rgba(255, 255, 255, 1)`;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      "mobile-medium": "370px",
      "mobile-small": "320px",
      "mobile-large": "425px",
      tablet: "768px",
      "laptop-large": "1440px",
      laptop: "1024px",
    },
    extend: {
      colors: {
        primary1: `hsl(${PRIMARY_COLOR_HSL}, 99% )`,
        primary5: `hsl(${PRIMARY_COLOR_HSL}, 95%)`,
        primary10: `hsl(${PRIMARY_COLOR_HSL}, 90%)`,
        primary20: `hsl(${PRIMARY_COLOR_HSL}, 80%)`,
        primary30: `hsl(${PRIMARY_COLOR_HSL}, 70%)`,
        primary40: `hsl(${PRIMARY_COLOR_HSL}, 60%)`,
        primary50: `hsl(${PRIMARY_COLOR_HSL}, 50%)`,
        primary60: `hsl(${PRIMARY_COLOR_HSL}, 40%)`,
        primary70: `hsl(${PRIMARY_COLOR_HSL}, 30%)`,
        primary80: `hsl(${PRIMARY_COLOR_HSL}, 20%)`,
        primary90: `hsl(${PRIMARY_COLOR_HSL}, 10%)`,
        primary100: `hsl(${PRIMARY_COLOR_HSL}, 0%)`,

        secondary1: `hsl(${SECONDARY_COLOR_HSL}, 99%)`,
        secondary5: `hsl(${SECONDARY_COLOR_HSL}, 95%)`,
        secondary10: `hsl(${SECONDARY_COLOR_HSL}, 90%)`,
        secondary20: `hsl(${SECONDARY_COLOR_HSL}, 80%)`,
        secondary30: `hsl(${SECONDARY_COLOR_HSL}, 70%)`,
        secondary40: `hsl(${SECONDARY_COLOR_HSL}, 60%)`,
        secondary50: `hsl(${SECONDARY_COLOR_HSL}, 50%)`,
        secondary60: `hsl(${SECONDARY_COLOR_HSL}, 40%)`,
        secondary70: `hsl(${SECONDARY_COLOR_HSL}, 30%)`,
        secondary80: `hsl(${SECONDARY_COLOR_HSL}, 20%)`,
        secondary90: `hsl(${SECONDARY_COLOR_HSL}, 10%)`,
        secondary100: `hsl(${SECONDARY_COLOR_HSL}, 0%)`,

        tertiary1: `hsl(${TERTIARY_COLOR_HSL}, 99%)`,
        tertiary5: `hsl(${TERTIARY_COLOR_HSL}, 95%)`,
        tertiary10: `hsl(${TERTIARY_COLOR_HSL}, 90%)`,
        tertiary20: `hsl(${TERTIARY_COLOR_HSL}, 80%)`,
        tertiary30: `hsl(${TERTIARY_COLOR_HSL}, 70%)`,
        tertiary40: `hsl(${TERTIARY_COLOR_HSL}, 60%)`,
        tertiary50: `hsl(${TERTIARY_COLOR_HSL}, 50%)`,
        tertiary60: `hsl(${TERTIARY_COLOR_HSL}, 40%)`,
        tertiary70: `hsl(${TERTIARY_COLOR_HSL}, 30%)`,
        tertiary80: `hsl(${TERTIARY_COLOR_HSL}, 20%)`,
        tertiary90: `hsl(${TERTIARY_COLOR_HSL}, 10%)`,
        tertiary100: `hsl(${TERTIARY_COLOR_HSL}, 0%)`,

        success1: `hsl(${SUCCESS_COLOR_HSL}, 99%)`,
        success5: `hsl(${SUCCESS_COLOR_HSL}, 95%)`,
        success10: `hsl(${SUCCESS_COLOR_HSL}, 90%)`,
        success20: `hsl(${SUCCESS_COLOR_HSL}, 80%)`,
        success30: `hsl(${SUCCESS_COLOR_HSL}, 70%)`,
        success40: `hsl(${SUCCESS_COLOR_HSL}, 60%)`,
        success50: `hsl(${SUCCESS_COLOR_HSL}, 50%)`,
        success60: `hsl(${SUCCESS_COLOR_HSL}, 40%)`,
        success70: `hsl(${SUCCESS_COLOR_HSL}, 30%)`,
        success80: `hsl(${SUCCESS_COLOR_HSL}, 20%)`,
        success90: `hsl(${SUCCESS_COLOR_HSL}, 10%)`,
        success100: `hsl(${SUCCESS_COLOR_HSL}, 0%)`,

        error1: `hsl(${ERROR_COLOR_HSL}, 99%)`,
        error5: `hsl(${ERROR_COLOR_HSL}, 95%)`,
        error10: `hsl(${ERROR_COLOR_HSL}, 90%)`,
        error20: `hsl(${ERROR_COLOR_HSL}, 80%)`,
        error30: `hsl(${ERROR_COLOR_HSL}, 70%)`,
        error40: `hsl(${ERROR_COLOR_HSL}, 60%)`,
        error50: `hsl(${ERROR_COLOR_HSL}, 50%)`,
        error60: `hsl(${ERROR_COLOR_HSL}, 40%)`,
        error70: `hsl(${ERROR_COLOR_HSL}, 30%)`,
        error80: `hsl(${ERROR_COLOR_HSL}, 20%)`,
        error90: `hsl(${ERROR_COLOR_HSL}, 10%)`,
        error100: `hsl(${ERROR_COLOR_HSL}, 0%)`,

        info1: `hsl(${INFO_COLOR_HSL}, 99%)`,
        info5: `hsl(${INFO_COLOR_HSL}, 95%)`,
        info10: `hsl(${INFO_COLOR_HSL}, 90%)`,
        info20: `hsl(${INFO_COLOR_HSL}, 80%)`,
        info30: `hsl(${INFO_COLOR_HSL}, 70%)`,
        info40: `hsl(${INFO_COLOR_HSL}, 60%)`,
        info50: `hsl(${INFO_COLOR_HSL}, 50%)`,
        info60: `hsl(${INFO_COLOR_HSL}, 40%)`,
        info70: `hsl(${INFO_COLOR_HSL}, 30%)`,
        info80: `hsl(${INFO_COLOR_HSL}, 20%)`,
        info90: `hsl(${INFO_COLOR_HSL}, 10%)`,
        info100: `hsl(${INFO_COLOR_HSL}, 0%)`,

        warning1: `hsl(${WARNING_COLOR_HSL}, 99%)`,
        warning5: `hsl(${WARNING_COLOR_HSL}, 95%)`,
        warning10: `hsl(${WARNING_COLOR_HSL}, 90%)`,
        warning20: `hsl(${WARNING_COLOR_HSL}, 80%)`,
        warning30: `hsl(${WARNING_COLOR_HSL}, 70%)`,
        warning40: `hsl(${WARNING_COLOR_HSL}, 60%)`,
        warning50: `hsl(${WARNING_COLOR_HSL}, 50%)`,
        warning60: `hsl(${WARNING_COLOR_HSL}, 40%)`,
        warning70: `hsl(${WARNING_COLOR_HSL}, 30%)`,
        warning80: `hsl(${WARNING_COLOR_HSL}, 20%)`,
        warning90: `hsl(${WARNING_COLOR_HSL}, 10%)`,
        warning100: `hsl(${WARNING_COLOR_HSL}, 0%)`,

        neutral1: `hsl(${NEUTRAL_COLOR_HSL}, 99%)`,
        neutral5: `hsl(${NEUTRAL_COLOR_HSL}, 95%)`,
        neutral10: `hsl(${NEUTRAL_COLOR_HSL}, 90%)`,
        neutral20: `hsl(${NEUTRAL_COLOR_HSL}, 80%)`,
        neutral30: `hsl(${NEUTRAL_COLOR_HSL}, 70%)`,
        neutral40: `hsl(${NEUTRAL_COLOR_HSL}, 60%)`,
        neutral50: `hsl(${NEUTRAL_COLOR_HSL}, 50%)`,
        neutral60: `hsl(${NEUTRAL_COLOR_HSL}, 40%)`,
        neutral70: `hsl(${NEUTRAL_COLOR_HSL}, 30%)`,
        neutral80: `hsl(${NEUTRAL_COLOR_HSL}, 20%)`,
        neutral90: `hsl(${NEUTRAL_COLOR_HSL}, 10%)`,
        neutral100: `hsl(${NEUTRAL_COLOR_HSL}, 0%)`,
      },
      fontSize: {
        "heading-extra-large": HEADING_EXTRA_LARGE_SIZE,
        "heading-large": HEADING_LARGE_SIZE,
        "heading-sub-large": HEADING_SUBLARGE_SIZE,
        heading: HEADING_SIZE,
        "sub-heading": SUBHEADING_SIZE,
        body: BODY_SIZE,
      },
      lineHeight: {
        "heading-extra-large": HEADING_EXTRA_LARGE_SIZE,
        "heading-large": HEADING_LARGE_SIZE,
        "heading-sub-large": HEADING_SUBLARGE_SIZE,
        heading: HEADING_SIZE,
        "sub-heading": SUBHEADING_SIZE,
        body: BODY_SIZE,
      },
      spacing: {
        "extra-large": HEADING_EXTRA_LARGE_SIZE,
        large: HEADING_LARGE_SIZE,
        "sub-large": HEADING_SIZE,
        medium: SUBHEADING_SIZE,
        "sub-medium": parseFloat(SUBHEADING_SIZE) - 0.4 + "rem",
        small: parseFloat(SUBHEADING_SIZE) - 0.8 + "rem",
        "extra-small": parseFloat(SUBHEADING_SIZE) - 1.6 + "rem",
      },
      borderRadius: {
        "extra-large": HEADING_EXTRA_LARGE_SIZE,
        large: HEADING_LARGE_SIZE,
        "sub-large": HEADING_SIZE,
        medium: SUBHEADING_SIZE,
        "sub-medium": parseFloat(SUBHEADING_SIZE) - 0.4 + "rem",
        small: parseFloat(SUBHEADING_SIZE) - 0.8 + "rem",
        "extra-small": parseFloat(SUBHEADING_SIZE) - 1.6 + "rem",
      },
      boxShadow: {
        "primary-low": lowShadow(PRIMARY_COLOR_SHADOW),
        "primary-medium": mediumShadow(PRIMARY_COLOR_SHADOW),
        "primary-high": highShadow(PRIMARY_COLOR_SHADOW),
        "primary-clay": clayShadow(PRIMARY_COLOR_HSL),
        "secondary-low": lowShadow(SECONDARY_COLOR_SHADOW),
        "secondary-medium": mediumShadow(SECONDARY_COLOR_SHADOW),
        "secondary-high": highShadow(SECONDARY_COLOR_SHADOW),
        "secondary-clay": clayShadow(SECONDARY_COLOR_HSL),
        "tertiary-low": lowShadow(TERTIARY_COLOR_SHADOW),
        "tertiary-medium": mediumShadow(TERTIARY_COLOR_SHADOW),
        "tertiary-high": highShadow(TERTIARY_COLOR_SHADOW),
        "tertiary-clay": clayShadow(TERTIARY_COLOR_HSL),
        "success-low": lowShadow(SUCCESS_COLOR_SHADOW),
        "success-medium": mediumShadow(SUCCESS_COLOR_SHADOW),
        "success-high": highShadow(SUCCESS_COLOR_SHADOW),
        "error-low": lowShadow(ERROR_COLOR_SHADOW),
        "error-medium": mediumShadow(ERROR_COLOR_SHADOW),
        "error-high": highShadow(ERROR_COLOR_SHADOW),
        "warning-low": lowShadow(WARNING_COLOR_SHADOW),
        "warning-medium": mediumShadow(WARNING_COLOR_SHADOW),
        "warning-high": highShadow(WARNING_COLOR_SHADOW),
        "info-low": lowShadow(INFO_COLOR_SHADOW),
        "info-medium": mediumShadow(INFO_COLOR_SHADOW),
        "info-high": highShadow(INFO_COLOR_SHADOW),
        "neutral-low": lowShadow(NEUTRAL_COLOR_SHADOW),
        "neutral-medium": mediumShadow(NEUTRAL_COLOR_SHADOW),
        "neutral-high": highShadow(NEUTRAL_COLOR_SHADOW),
        "neutral-clay": clayShadow(NEUTRAL_COLOR_HSL),
        low: lowShadow(BLACK_COLOR_SHADOW),
        medium: mediumShadow(BLACK_COLOR_SHADOW),
        high: highShadow(BLACK_COLOR_SHADOW),
      },
      transitionDuration: {
        "extra-fast": "100ms",
        fast: "200ms",
        medium: "400ms",
        slow: "600ms",
        "extra-slow": "800ms",
        slowest: "1000ms",
      },
    },
  },
  plugins: [],
};
