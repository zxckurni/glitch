'use strict';

const App = require('./Server')
const Server = App()
Server.listen(process.env.PORT || 4500)
// App.WSS.AsServer({server:})
