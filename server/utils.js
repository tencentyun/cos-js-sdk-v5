function replaceMap ({
  content = '',
  map = {},
  getRegStr = key => key,
}) {
  const regList = Object.keys(map).map(key => {
    const regStr = getRegStr(key)
    return {
      regStr,
      regxp: new RegExp(regStr, 'gm'),
      value: map[key]
    }
  })

  const regAllStr = regList.map(item => item.regStr).join('|')
  
  return content.replace(new RegExp(regAllStr, 'gm'), (match) => {
    for(let {regxp, value} of regList) {
      if (regxp.test(match)) {
        return value
      }
    }
  })
}

function replaceContent ({ content, map }) {
  const result = replaceMap({
    content: content.toString(),
    map,
    getRegStr(key) {
      return `\\\${\\\s\*${key}\\\s\*}`
    }
  })

  return Buffer.from(result)
}

module.exports = {
  replaceContent
}