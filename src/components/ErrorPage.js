import React from 'react'
const logoSVG = require('../images/error.svg')
function ErrorPage() {
    return (
        <div style={{ textAlign: "center" }}>
            <img alt="Error not found" width={'50%'}
                src={logoSVG.default} ></img>
        </div>
    )
}

export default ErrorPage