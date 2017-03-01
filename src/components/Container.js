import React, { Component } from 'react'
import { Collapse, Select, Slider } from 'antd'

import Box from './Box'

import './Container.css'

const Option = Select.Option
const Panel = Collapse.Panel

class Container extends Component {
    static defaultProps = {
        boxColors: [ '#004358', '#1F8A70', '#BEDB39', '#FFE11A', '#FD7400' ]
    }

    _boxes = []

    state = {
        axis: 'x',
        styles: {
            alignItems: 'flex-start',
            backgroundColor: 'lightgray',
            display: 'flex',
            flexDirection: 'row',
            height: '600px',
            justifyContent: 'flex-start',
            width: `${ window.outerWidth }px`,
        },
        boxes: [
            { backgroundColor: '#004358' },
            { backgroundColor: '#1F8A70' },
            { backgroundColor: '#BEDB39' },
            { backgroundColor: '#FFE11A' },
            { backgroundColor: '#FD7400' },
        ]
    }

    handleJustifyContentChange = (evt) => {
        // this._boxes.forEach(box => {
        //     console.log('box.box.offsetLeft: ', box.box.offsetLeft)
        // })
        this.setState({
            styles: { ...this.state.styles, justifyContent: evt }
        })
        setTimeout(() => {
            console.log('next tick...')
            this.setState({
                boxes: this.state.boxes.map((box, idx) => {
                    const axis = this.state.axis
                    const _box = this._boxes[ idx ].box
                    // const transform = `translateX(${ this._boxes[ idx ].box.offsetLeft - parentOffsetLeft - siblingOffsetLeft }px)`
                    // GSAP translateX
                    if (axis === 'x') {
                        const parentOffsetLeft = this._boxes[ idx ].box.parentNode.offsetLeft
                        const siblingOffsetLeft = idx * _box.offsetWidth
                        let x = _box.offsetLeft - parentOffsetLeft - siblingOffsetLeft
                        let y = 0
                        return { ...box, x, y }
                    } else {
                        const parentOffsetTop = this._boxes[ idx ].box.parentNode.offsetTop
                        const siblingOffsetTop = idx * _box.offsetHeight
                        console.log('parentOffsetTop: ', parentOffsetTop, _box.offsetTop, siblingOffsetTop)
                        let x = 0
                        let y = _box.offsetTop - parentOffsetTop - siblingOffsetTop
                        return { ...box, x, y }
                    }
                })
            })
        }, 0)
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

    render() {
        const { axis, styles } = this.state
        console.log('render: ', axis, styles.flexDirection)
        return (
            <div className="container">
                <Collapse bordered={ false } accordion>
                    <Panel header="flex-direction" key="1">
                        <Select id="flex-direction-control" defaultValue="row" style={{ width: 120 }} onChange={ this.handleFlexDirectionChange }>
                            <Option value="row">row</Option>
                            <Option value="column">column</Option>
                            <Option value="row-reverse">row-reverse</Option>
                            <Option value="column-reverse">column-reverse</Option>
                        </Select>
                    </Panel>
                    <Panel header="justify-content" key="2">
                        <Select id="justify-content-control" defaultValue="flex-start" style={{ width: 120 }} onChange={ this.handleJustifyContentChange }>
                            <Option value="flex-start">flex-start</Option>
                            <Option value="flex-end">flex-end</Option>
                            <Option value="center">center</Option>
                            <Option value="space-around">space-around</Option>
                            <Option value="space-between">space-between</Option>
                        </Select>
                    </Panel>
                    <Panel header="align-items" key="3">
                        <Select id="align-items-control" defaultValue="flex-start" style={{ width: 120 }} onChange={ this.handleAlignItemsChange }>
                            <Option value="flex-start">flex-start</Option>
                            <Option value="flex-end">flex-end</Option>
                            <Option value="center">center</Option>
                            <Option value="stretch">stretch</Option>
                            <Option value="baseline">baseline</Option>
                        </Select>
                    </Panel>
                    <Panel header="height" key="4">
                        <Slider style={{ width: '200px' }} min={ 200 } max={ window.outerHeight } onChange={ this.handleHeightChange } />
                    </Panel>
                    <Panel header="width" key="5">
                        <Slider style={{ width: '200px' }} min={ 200 } max={ window.outerWidth } defaultValue={ window.outerWidth } onChange={ this.handleWidthChange } />
                    </Panel>
                </Collapse>
                <div className="row" style={{ flexDirection: styles.flexDirection, height: styles.height }}>
                    { this.state.boxes.map((box, idx) => <Box key={ box.backgroundColor } styles={ box } number={ idx } axis={ axis } />) }
                </div>
                <div className="row-mirror" style={ this.state.styles }>
                    {
                        this.state.boxes.map(({ backgroundColor }, idx) => (
                            <Box ref={ box => this._boxes[ idx ] = box } key={ backgroundColor } styles={{ backgroundColor }} number={ idx } />
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default Container
