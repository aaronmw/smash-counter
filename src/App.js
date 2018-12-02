import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import config from './config';

const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    background: inherit;
    color: inherit;
    border: none;
    outline: none;
    list-style-type: none;
    font-weight: inherit;
    font-size: inherit;
    font-style: inherit;
    text-decoration: inherit;
    box-sizing: border-box;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  :root {
    font-size: 40vh;
    line-height: 24px;
    font-family: sans-serif;
  }
`;

const AppContainer = styled.div`
  background-color: ${config.colors.background};
  color: ${config.colors.foreground};
  overflow: hidden;
  position: fixed;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class App extends Component {
  _touchStartedAt = null;

  state = {
    counter: 0
  };

  handleTouchStart = () => {
    this._touchStartedAt = Date.now();
    this._decrementTimer = setTimeout(this.decrement, config.durations.long);
    this._resetTimer = setTimeout(this.reset, config.durations.looong);
  };

  handleTouchEnd = () => {
    const touchDuration = Date.now() - this._touchStartedAt;
    switch (true) {
      case touchDuration >= config.durations.looong:
        // Do nothing special
        break;

      case touchDuration >= config.durations.long:
        this._resetTimer = clearTimeout(this._resetTimer);
        break;

      default:
        this._decrementTimer = clearTimeout(this._decrementTimer);
        this._resetTimer = clearTimeout(this._resetTimer);
        this.increment();
    }
  };

  increment = () => {
    this.setState(state => ({
      ...state,
      counter: state.counter + 1
    }));
  };

  decrement = () => {
    this.setState(state => ({
      ...state,
      counter: state.counter - 1
    }));
  };

  reset = () => {
    this.setState(state => ({
      ...state,
      counter: 0
    }));
  };

  render() {
    const { counter } = this.state;
    return (
      <AppContainer
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
      >
        <GlobalStyles />
        {counter}
      </AppContainer>
    );
  }
}

export default App;
