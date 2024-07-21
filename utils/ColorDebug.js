/**
 * @typedef {"red"|"green"|"blue"|"cyan"|"magenta"|"yellow"|"white"|"black"} ANSIColor
 */

/**
 * @typedef {object} TextStyle
 * 
 * @property {ANSIColor} textColor
 * @property {ANSIColor} backgroundColor
 * @property {boolean} bold
 * @property {boolean} strike
 * @property {boolean} underline
 */

/**
 * @typedef {object} BrowserStyledText
 * 
 * @property {string} text
 * @property {string} style
 */

/**
 * @type {TextStyle}
 */
const defaultANSITextStyle = {
    textColor: "white",
    backgroundColor: "black",
    strike: false,
    bold: false,
    underline: false
}

/**
 * @type {TextStyle}
 */
const defaultBrowserTextStyle = {
    textColor: "black",
    backgroundColor: "white",
    strike: false,
    bold: false,
    underline: false
}


const ansiColorStarts = {
    "red": "\x1b[31m",
    "green": "\x1b[32m",
    "blue": "\x1b[34m",
    "cyan": "\x1b[36m",
    "magenta": "\x1b[35m",
    "yellow": "\x1b[33m",
    "white": "\x1b[37m",
    "black": "\x1b[30m"
}

const ansiBackgroundStarts = {
    "red": "\x1b[41m",
    "green": "\x1b[42m",
    "blue": "\x1b[44m",
    "cyan": "\x1b[46m",
    "magenta": "\x1b[45m",
    "yellow": "\x1b[43m",
    "white": "\x1b[47m",
    "black": "\x1b[40m"
}

const ansiAttrStarts = {
    "bold": "\x1b[1m",
    "underline": "\x1b[4m",
    "strike": "\x1b[9m"
}

const ansiEnd = "\x1b[0m"

/**
 * @param {TextStyle} textStyle
 */
function textStyleToCss(textStyle) {
    return [
        `color: ${textStyle.textColor}`,
        `background-color: ${textStyle.backgroundColor}`,
        (
            [
                textStyle.underline,
                textStyle.strike
            ].some((x) => x)
        ) && `text-decoration: ${Object.entries({
            "strike": "line-through",
            "underline": "underline"
        }).map(([key, syntax]) => {
            const value = Reflect.get(textStyle, key)
            return value && syntax
        }).filter((x) => x).join(" ")
        }`,
        textStyle.bold && `font-weight: bold`
    ].filter((x) => x).join("; ") + ";"
}

/**
 * @param {string} text
 * @param {Partial<TextStyle>} textStyle
 * @returns {string} 
 */
function textToANSI(text, textStyle) {
    const fullStyle = { ...defaultANSITextStyle, ...textStyle }
    const ansiTextColor = ansiColorStarts[fullStyle.textColor] || ""
    const ansiBackgroundColor = ansiBackgroundStarts[fullStyle.backgroundColor] || ""
    const ansiBold = fullStyle.bold ? ansiAttrStarts.bold : ""
    const ansiUnderline = fullStyle.underline ? ansiAttrStarts.underline : ""
    const ansiStrike = fullStyle.strike ? ansiAttrStarts.strike : ""

    const ansiStart = ansiTextColor + ansiBackgroundColor + ansiBold + ansiUnderline + ansiStrike
    return `${ansiStart}${text}${ansiEnd}`
}

/**
 * @param {string} text
 * @param {Partial<TextStyle>} textStyle
 * @returns {BrowserStyledText} 
 */
function textToBrowser(text, textStyle) {
    const fullStyle = { ...defaultBrowserTextStyle, ...textStyle }
    return {
        text: "%c" + text.replace(/%/g, "%%"),
        style: textStyleToCss(fullStyle)
    }
}





export class ANSIColorDebug {
    /**
     * 
     * @param {string} text 
     * @param {Partial<TextStyle>} [textStyle={}] 
     */
    format(text, textStyle = {}) {
        return textToANSI(text, textStyle)
    }
    /**
     * 
     * @param {string} text 
     * @param {Partial<TextStyle>} [textStyle={}] 
     */
    log(text, textStyle = {}) {
        console.log(this.format(text, textStyle))
    }
    /**
     * 
     * @param {string} text 
     * @param {Partial<TextStyle>} [textStyle={}] 
     */
    info(text, textStyle = {}) {
        console.info(this.format(text, textStyle))
    }
    /**
     * 
     * @param {string} text 
     * @param {Partial<TextStyle>} [textStyle={}] 
     */
    warn(text, textStyle = {}) {
        console.warn(this.format(text, textStyle))
    }
    /**
     * 
     * @param {string} text 
     * @param {Partial<TextStyle>} [textStyle={}] 
     */
    error(text, textStyle = {}) {
        console.error(this.format(text, textStyle))
    }
}

export class BrowserColorDebug {
    /**
     * 
     * @param {string} text 
     * @param {Partial<TextStyle>} [textStyle={}] 
     */
    format(text, textStyle = {}) {
        return textToBrowser(text, textStyle)
    }
    /**
     * 
     * @param {string} text 
     * @param {Partial<TextStyle>} [textStyle={}] 
     */
    log(text, textStyle = {}) {
        const {text:consoleText, style:consoleStyle} = this.format(text, textStyle)
        console.log(consoleText, consoleStyle)
    }
    /**
     * 
     * @param {string} text 
     * @param {Partial<TextStyle>} [textStyle={}] 
     */
    error(text, textStyle = {}) {
        const {text:consoleText, style:consoleStyle} = this.format(text, textStyle)
        console.error(consoleText, consoleStyle)
    }
    /**
     * 
     * @param {string} text 
     * @param {Partial<TextStyle>} [textStyle={}] 
     */
    warn(text, textStyle = {}) {
        const {text:consoleText, style:consoleStyle} = this.format(text, textStyle)
        console.warn(consoleText, consoleStyle)
    }
    /**
     * 
     * @param {string} text 
     * @param {Partial<TextStyle>} [textStyle={}] 
     */
    info(text, textStyle = {}) {
        const {text:consoleText, style:consoleStyle} = this.format(text, textStyle)
        console.info(consoleText, consoleStyle)
    }
}

export default class ColorDebug {
    /**
     * 
     * @returns {ANSIColorDebug}
     */
    static ansi() {
        return new ANSIColorDebug()
    }
    /**
     * 
     * @returns {BrowserColorDebug}
     */
    static browser() {
        return new BrowserColorDebug()
    }
}