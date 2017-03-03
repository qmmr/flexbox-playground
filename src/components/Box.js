/* eslint no-undef: 0, comma-dangle: 0 */
import React, { Component } from 'react'

import './Box.css'

class Box extends Component {
    static propTypes = {
        x: React.PropTypes.number.isRequired,
    }

    componentDidMount() {
        // console.log('Box :: componentDidMount :: this.props', this.props)
        TweenLite.set(this.box, { x: 0, y: 0 })
        // TweenLite.to(this.box, 1, {
        //     x: 0,
        //     ease: Back.easeOut
        // })
    }

    shouldComponentUpdate(newProps) {
        // console.log('shouldComponentUpdate: this.props.x, newProps.x', this.props.x, newProps.x)
        // console.log('shouldComponentUpdate: this.props.prevOffsetLeft, newProps.prevOffsetLeft', this.props.prevOffsetLeft, newProps.prevOffsetLeft)
        return true //this.props.x !== newProps.x
    }

    componentWillReceiveProps(newProps) {
        // console.log('Box :: componentWillReceiveProps :: newProps: ', newProps)
        // const axis = newProps.axis
        // console.log('componentWillReceiveProps :: axis: ', axis)
        // if (newProps.x !== newProps.prevOffsetLeft) {
        //     TweenLite.set(this.box, {
        //         x: newProps.prevOffsetLeft,
        //     })
        // }
        // console.log('componentWillReceiveProps', newProps)
    }

    render() {
        const backgroundColor = this.props.styles.backgroundColor
        const { x } = this.props
        // console.groupCollapsed('Box :: render')
        // console.log('this.props.x: ', x)
        // console.groupEnd()

        if (this.box) {
            // console.log('this.box && x !== prevOffsetLeft')
            // console.log(`this.box._gsTransform.x -> ${ this.box._gsTransform.x }`)
            // console.log('TweenLite.set x -> ', x)
            TweenLite.set(this.box, { x })
            TweenLite.to(this.box, .75, {
                autoRound: false,
                x: 0,
                ease: Expo.easeInOut,
            })
        }

        return (
            <div className="box" ref={ b => this.box = b } style={{ backgroundColor }}>
                <div className="box-content">
                    { this.props.number }
                </div>
            </div>
        )
    }
}

export default Box
