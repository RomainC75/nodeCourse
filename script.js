const fs = require('fs')

fs.writeFileSync('my_data',JSON.stringify(
    {
    name:'nom',
    lastname:'che'
}
))