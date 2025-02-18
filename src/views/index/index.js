let comData = {}
const coms = require.context('./components', true, /\.vue$/)
coms
  .keys()
  .map(coms)
  .forEach((item) => {
    let cname = item.default.name
    comData[cname] = item.default
  })

export default comData
