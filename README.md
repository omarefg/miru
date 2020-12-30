# Miru
Miru is a lightweight library that allows you to create reactive components using vanilla javascript

## Instructions

```bash
npm i @omarefg/miru

yarn add @omarefg/miru
```

## Example

First create your component

```js
import Miru from '@omarefg/miru'

// First create a View function, this function that must return an HMTL element
function View() {
  const { counter } = this.state;
  const { containerStyle, buttonStyle } = this.props;
  const container = document.createElement('div');
  const prevButton = document.createElement('button');
  const nextButton = document.createElement('button');
  const count = document.createElement('span');

  count.innerText = counter;
  prevButton.innerText = 'Prev';
  nextButton.innerText = 'Next';

  Object.keys(containerStyle).forEach((key) => {
    container.style[key] = containerStyle[key];
  });

  Object.keys(buttonStyle).forEach((key) => {
    prevButton.style[key] = buttonStyle[key];
    nextButton.style[key] = buttonStyle[key];
  });

  prevButton.addEventListener('click', this.handleButtonPressed(-1));
  nextButton.addEventListener('click', this.handleButtonPressed(1));

  container.appendChild(prevButton);
  container.appendChild(count);
  container.appendChild(nextButton);

  return container;
}

// Now, this is your component
// It must return a Miru instance
// The Miru instance receive two parameters
// 1. The view
// 2. The config object
export default MySuperFancyCounterComponent = (props) => new Miru(View, {
  props,
  defaultProps: {
    containerStyle: {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonStyle: {
      padding: '10px 30px',
      backgroundColor: 'green',
      borderRadius: '5px',
      border: 'none',
      color: 'white',
      margin: '0 5px',
    },
  },
  handlers: {
    handleButtonPressed(step) {
      const self = this;
      return () => {
        self.update({ counter: self.state.counter + step });
      };
    },
  },
  state: {
    counter: 0,
  },
});
```

Now you can call your component

```js
import MySuperFancyCounterComponent from 'path/to/MySuperFancyCounterComponent'

document.getElementById('app').appendChild(MySuperFancyCounterComponent())
```



## Config object

```js
{
    props: {}, // The props object, it represents the data passed to the component
    defaultProps: {}, // It represent the default value for the props in case the value was not passed
    handlers: {}, // All the logic your component will be using will be inside this object, then access to the handler just using this.handlerName
    state: {} // The state object
}
```

## API

- update: Must receive an object (the state) inside, this method triggers an update in the component with the new state.

## Why should I use Miru?

Why not?🤷🤷‍♀️ Give it a shot if you want a simple reactive SPA and dont want the tons of dependencies.