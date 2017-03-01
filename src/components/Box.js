import React, { Component } from 'react'

import './Box.css'

class Box extends Component {
    componentWillReceiveProps(newProps) {
        // console.log('componentWillReceiveProps :: newProps: ', newProps.styles)
        const axis = newProps.axis
        // console.log('componentWillReceiveProps :: axis: ', axis)
        TweenLite.to(this.box, .2, { // eslint-disable-line
            [ axis ]: newProps.styles[ axis ],
            ease: Power2.easeInOut // eslint-disable-line
        })
        // console.log('componentWillReceiveProps', newProps)
    }

    render() {
        // console.log('styles: ')
        // console.dir(this.props.styles)
        const styles = { ...this.props.styles, transition: 'transform 250ms ease-in-out' }
        return (
            <div className="box" ref={ n => this.box = n } style={ styles }>
                <div className="box-content">
                    { this.props.number }
                </div>
            </div>
        )
    }
}

export default Box
