import React from 'react'

//HOC Layout in case we want to add Fixed elements later on the project (Navbar || Footer)

export const Layout = (props) => {
    return (
        <div>
              { props.children }
        </div>
    )
}