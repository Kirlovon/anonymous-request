# Anonymous-Request
This library allows you to easily send anonymous GET request via Tor. There is no need to install Tor and set it up as a proxy, since this library powered by awesome **[mini-tor](https://github.com/wbenny/mini-tor)** project, made by **[wbenny](https://github.com/wbenny)**.

Each request passes through different Tor routers, and takes about 3 seconds.

*PS: Only Windows is supported!*

## Installation

Installation from the Github repository:
```
npm install Kirlovon/anonymous-request --save
```

## Example

```javascript
const Request = require('anonymous-request');

Request('api.ipify.org', { 
    timeout: 5000,
    attempts: 5,
    encoding: 'utf8',
    log: true
}).then(response => {
    console.log(response);
})
```
