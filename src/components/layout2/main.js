import React from 'react'
import "./layout2.css"


function Main(props) {
  return (
    <main className={'myMain col '+("className" in props?props.className:"")}>
        {props.children}
    </main>
  )
}

export default Main