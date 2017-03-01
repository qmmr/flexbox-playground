import React, { Component } from 'react'
import { Layout } from 'antd'

import Container from './Container'

import './App.css'

const { Header, Footer, Sider, Content } = Layout

class FlexboxPlaygroundApp extends Component {

    state = {
        containers: [
            <Container key={ 0 } />
        ]
    }

    handleAddContainer = () => {
        this.setState({
            containers: [ ...this.state.containers, <Container key={ this.state.containers + 1 } /> ]
        })
    }

    renderContainers = () => {
        return this.state.containers
    }

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
