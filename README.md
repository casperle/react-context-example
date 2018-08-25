# Kiwi searching example

This application uses Skypickers search API for getting locations and flights. This API is found here https://github.com/SScorp/Skypicker-apiary/blob/master/apiary.apib.

# Used technologies

- React (https://reactjs.org)
- BlueprintJS (https://blueprintjs.com)
- Babel (https://babeljs.io)
- Webpack (https://webpack.js.org/)

# How to use?

The classic way :)

```
npm install
```
then
```
npm start
```

This will start webpack dev server. There is no production version of the application.

# React context
The application uses react context. There is implemented kind of a store system. In file `src/stores/config.js` are two functions - `mountStores` and `provideStores`.
- `provideStores`
  - uses react context providers imported from files from `src/stores` forlder, to wrap passed component by these providers
  - it can be modified to accept a list of store names as an argument and use only passed stores to wrap around passed component
- `mountStores`
  - accepts a list of store names as a parameter and uses react context consumers to wrap them around the passed compenent
