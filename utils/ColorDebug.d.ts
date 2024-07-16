export class ANSIColorDebug {
    /**
     *
     * @param {string} text
     * @param {Partial<TextStyle>} [textStyle={}]
     */
    format(text: string, textStyle?: Partial<TextStyle>): string;
    /**
     *
     * @param {string} text
     * @param {Partial<TextStyle>} [textStyle={}]
     */
    log(text: string, textStyle?: Partial<TextStyle>): void;
    /**
     *
     * @param {string} text
     * @param {Partial<TextStyle>} [textStyle={}]
     */
    info(text: string, textStyle?: Partial<TextStyle>): void;
    /**
     *
     * @param {string} text
     * @param {Partial<TextStyle>} [textStyle={}]
     */
    warn(text: string, textStyle?: Partial<TextStyle>): void;
    /**
     *
     * @param {string} text
     * @param {Partial<TextStyle>} [textStyle={}]
     */
    error(text: string, textStyle?: Partial<TextStyle>): void;
}
export class BrowserColorDebug {
    /**
     *
     * @param {string} text
     * @param {Partial<TextStyle>} [textStyle={}]
     */
    format(text: string, textStyle?: Partial<TextStyle>): BrowserStyledText;
    /**
     *
     * @param {string} text
     * @param {Partial<TextStyle>} [textStyle={}]
     */
    log(text: string, textStyle?: Partial<TextStyle>): void;
    /**
     *
     * @param {string} text
     * @param {Partial<TextStyle>} [textStyle={}]
     */
    error(text: string, textStyle?: Partial<TextStyle>): void;
    /**
     *
     * @param {string} text
     * @param {Partial<TextStyle>} [textStyle={}]
     */
    warn(text: string, textStyle?: Partial<TextStyle>): void;
    /**
     *
     * @param {string} text
     * @param {Partial<TextStyle>} [textStyle={}]
     */
    info(text: string, textStyle?: Partial<TextStyle>): void;
}
export default class ColorDebug {
    /**
     *
     * @returns {ANSIColorDebug}
     */
    static ansi(): ANSIColorDebug;
    /**
     *
     * @returns {BrowserColorDebug}
     */
    static browser(): BrowserColorDebug;
}
export type ANSIColor = "red" | "green" | "blue" | "cyan" | "magenta" | "yellow" | "white" | "black";
export type TextStyle = {
    textColor: ANSIColor;
    backgroundColor: ANSIColor;
    bold: boolean;
    strike: boolean;
    underline: boolean;
};
export type BrowserStyledText = {
    text: string;
    style: string;
};
