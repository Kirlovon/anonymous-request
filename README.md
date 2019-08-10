# Anonymous-Request
This library allows you to send anonymous GET request via Tor. Each request passes through different Tor routers, and takes about 3 seconds.

Powered by awesome **[mini-tor](https://github.com/wbenny/mini-tor)**, made by **[wbenny](https://github.com/wbenny)**.

*PS: Only Windows is supported!*

## Installation

Installation from the Github repository:
```
npm install Kirlovon/Anonymous-Request --save
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
