import React, { Component, PropTypes } from 'react'
import { Select } from 'antd'

import Box from './Box'

import './Container.css'

const Option = Select.Option
// const Panel = Collapse.Panel
class Container extends Component {
    static defaultProps = {
        boxColors: [ '#004358', '#1F8A70', '#BEDB39', '#FFE11A', '#FD7400' ]
    }

    static propTypes = {
        windowInnerWidth: PropTypes.number.isRequired,
    }

    _boxRefs = []

    state = {
        axis: 'x',
        styles: {
            alignItems: 'flex-start',
            backgroundColor: 'lightgray',
            display: 'flex',
            flexDirection: 'row',
            height: '600px',
            justifyContent: 'flex-start',
            width: `${ this.props.windowInnerWidth - 200 - 15 }px`,
        },
        boxes: [
            { backgroundColor: '#004358', x: 0, prevOffsetLeft: 0 },
            { backgroundColor: '#1F8A70', x: 0, prevOffsetLeft: 0 },
            { backgroundColor: '#BEDB39', x: 0, prevOffsetLeft: 0 },
            { backgroundColor: '#FFE11A', x: 0, prevOffsetLeft: 0 },
            { backgroundColor: '#FD7400', x: 0, prevOffsetLeft: 0 },
        ]
    }

    componentDidMount() {
        this.setState({
            boxes: this._boxRefs.map(({ box }, idx) => {
                return {
                    ...this.state.boxes[ idx ],
                    prevOffsetLeft: box.offsetLeft,
                }
            })
        })
    }

    handleJustifyContentChange = (evt) => {
        this.setState({
            styles: { ...this.state.styles, justifyContent: evt }
        }, () => {
            this.setState({
                boxes: this._boxRefs.map((box, idx) => {
                    const boxOffsetLeft = box.box.offsetLeft
                    const currentBox = this.state.boxes[ idx ]
                    const x = currentBox.prevOffsetLeft - boxOffsetLeft
                    const newBox = {
                        ...currentBox,
                        prevOffsetLeft: boxOffsetLeft,
                        x,
                        offsetLeft: boxOffsetLeft,
                    }

                    return newBox
                })
            })
        })
    }

    handleFlexDirectionChange = (evt) => {
        this.setState({
            axis: /row/.test(evt) ? 'x' : 'y',
            styles: { ...this.state.styles, flexDirection: evt }
        })
    }

    handleAlignItemsChange = (evt) => this.setState({ styles: { ...this.state.styles, alignItems: evt } })
    handleHeightChange = (evt) => this.setState({ styles: { ...this.state.styles, height: `${ evt }px` } })
    handleWidthChange = (evt) => this.setState({ styles: { ...this.state.styles, width: `${ evt }px` } })

    renderBoxes = () => {
        return this.state.boxes.map((box, idx) => {
            return <Box
                ref={ box => this._boxRefs[ idx ] = box }
                key={ box.backgroundColor }
                styles={ box }
                number={ idx }
                axis={ this.state.axis }
                x={ box.x }
            />
        })
    }

    render() {
        const { styles } = this.state
        return (
            <div className="container">
                <label>flex-direction</label>
                <Select id="flex-direction-control" defaultValue="row" style={{ width: 120 }} onChange={ this.handleFlexDirectionChange }>
                    <Option value="row">row</Option>
                    <Option value="column">column</Option>
                    <Option value="row-reverse">row-reverse</Option>
                    <Option value="column-reverse">column-reverse</Option>
                </Select>
                <label>justify-content</label>
                <Select id="justify-content-control" defaultValue={ styles.justifyContent } style={{ width: 120 }} onChange={ this.handleJustifyContentChange }>
                    <Option value="flex-start">flex-start</Option>
                    <Option value="flex-end">flex-end</Option>
                    <Option value="center">center</Option>
                    <Option value="space-around">space-around</Option>
                    <Option value="space-between">space-between</Option>
                </Select>
                <div className="row" style={ styles }>
                    { this.renderBoxes() }
                </div>
            </div>
        )
    }
}

export default Container
