import React, { Component } from 'react'
import { Layout } from 'antd'

import Container from './Container'

import './App.css'

const { Header, Footer, Sider, Content } = Layout

class FlexboxPlaygroundApp extends Component {

    state = {
        windowInnerWidth: null,
        containers: [
            <Container key={ 0 } windowInnerWidth={ window.innerWidth } />
        ]
    }

    handleResize = (evt) => {
        this.setState({ windowInnerWidth: window.innerWidth });
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize)
        this.setState({ windowInnerWidth: window.innerWidth });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    handleAddContainer = () => {
        const { containers, windowInnerWidth } = this.state
        this.setState({
            containers: [ ...containers, <Container key={ containers.length + 1 } windowInnerWidth={ windowInnerWidth } /> ]
        })
    }

    renderContainers = () => this.state.containers.map((container, idx) =>
            this.state.windowInnerWidth && <Container key={ idx } windowInnerWidth={ this.state.windowInnerWidth } />)

    render() {
        return (
            <Layout className="flexbox-app">
                <Sider>Controls here?</Sider>
                <Layout>
                    <Header>
                        <h1>Welcome to Flexbox</h1>
                        { /* <Button onClick={ this.handleAddContainer }>Add container</Button> */ }
                    </Header>
                    <Content>
                        { this.renderContainers() }
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default FlexboxPlaygroundApp
