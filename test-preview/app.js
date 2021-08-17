const express = require( 'express' )
const { createProxyMiddleware } = require( 'http-proxy-middleware' )
const app = express()

app.use( express.static( './dist' ) )
app.use( '/boss', createProxyMiddleware( {
    target: 'http://eduboss.lagou.com',
    changeOrigin: true,
   
} ) )

app.use( '/front', createProxyMiddleware( {
    target: 'http://edufront.lagou.com',
    changeOrigin: true,
} ) )

app.listen( 3000, () => {
    console.log( 'http://127.0.0.1:3000' );
} )
