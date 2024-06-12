import { css } from "@emotion/react"

import theme from '@/themes/main'

export default function Index(){
    return <div css={css`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: ${theme.gutters.lg}
    `}>
        <h1>Know/Check</h1>
        <i>By Wired Hyena LLC</i>
        <h2>The World's Leading AI-Powered Quiz Platform</h2>
    </div>
}