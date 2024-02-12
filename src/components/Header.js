

import React from 'react'

const logoSVG = require('../images/logo.svg')
const logoNameSVG = require('../images/GitHub_Logo.png')

function header() {
  return (<div style={{padding:"10px"}}>
    <img src={logoSVG.default} width={"100px"} alt='img' ></img>
    <img src={logoNameSVG} width={"170px"} alt='img' ></img>
    </div>
  )
}

export default header