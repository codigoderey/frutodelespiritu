  const { SitemapStream, streamToPromise } = require( 'sitemap' )
  const { Readable } = require( 'stream' )
  const axios = require('axios')

  
  export default async (req, res) => {

  const {data} = await axios.get('https://frutodelespiritu.com/api/lecturas')

  const dynamicLinks = data.map(s => { 
    return (
      {url: `/publicaciones/${s.slug}`,  changefreq: 'daily', priority: 0.3}
    )}
  )

  const staticLinks = [
      {url: `/`,  changefreq: 'daily', priority: 0.3},
      {url: `/lecturas`,  changefreq: 'daily', priority: 0.3},
      {url: `/biblia/libros?id=592420522e16049f-01`,  changefreq: 'daily', priority: 0.3},
      {url: `/ingresar`,  changefreq: 'daily', priority: 0.3},
      {url: `/registrarme`,  changefreq: 'daily', priority: 0.3},
      {url: `/biblia/buscar`,  changefreq: 'daily', priority: 0.3},
  ]

  console.log(staticLinks)

    // An array with your links
  const links = dynamicLinks.concat(staticLinks)

  // Create a stream to write to
  const stream = new SitemapStream( { hostname: `https://${req.headers.host}` } )

  const xmlString = await streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
    data.toString()
  )

  res.end(xmlString)

}