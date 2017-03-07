/* eslint no-undef: 0, comma-dangle: 0 */
import React, { Component } from 'react'

import './Box.css'

class Box extends Component {
    static propTypes = {
        x: React.PropTypes.number.isRequired,
        y: React.PropTypes.number.isRequired,
    }

    componentDidMount() {
        // console.log('Box :: componentDidMount :: this.props', this.props)
        TweenLite.set(this.box, { x: 0, y: 0 })
    }

    shouldComponentUpdate(newProps) {
        return true //this.props.x !== newProps.x
    }

    render() {
        const backgroundColor = this.props.styles.backgroundColor
        const { axis, startX, startY, x, y } = this.props
        // console.groupCollapsed('Box :: render')
        // console.log('this.props.x: ', x)
        // console.groupEnd()

        if (this.box) {
            // console.log('x: ', x, 'y: ', y)
            if (axis === 'y') {
                console.log('startX: ', startX, ' startY: ', startY)
                TweenLite.fromTo(this.box, .75, { x: startX, y: startY }, { x: 0, y: 0 })
                // TweenLite.set(this.box, { x: 0, y })
                // TweenLite.to(this.box, .75, {
                //     autoRound: false,
                //     x: 0,
                //     y: 0,
                //     ease: Expo.easeInOut,
                // })
            } else {
                TweenLite.set(this.box, { x, y })
                TweenLite.to(this.box, .75, {
                    autoRound: false,
                    x: 0,
                    y: 0,
                    ease: Expo.easeInOut,
                })
            }
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
