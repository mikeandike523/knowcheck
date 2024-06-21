const indexPre = require('./api.js');

Object.entries(indexPre).forEach(([k,v])=>{
    v.then((f)=>{
        module.exports[k] = f;
    }).catch(e=>{
        console.error(`Failed to export ${k} from index.pre.ts`),
        console.error(e)
        process.exit(1)
    })
})

