---
to: "src/components/<%= h.changeCase.pascal(name).toLowerCase().slice(0, 5) === 'base-' ? '_' : '' %><%= h.changeCase.pascal(name) %>.unit.js"
---
<%
  let fileName = h.changeCase.pascal(name).toLowerCase()
  const importName = h.changeCase.pascal(fileName)
  if (fileName.slice(0, 5) === 'base-') {
    fileName = '_' + fileName
  }
%>import <%= importName %> from './<%= fileName %>'

describe('@components/<%= fileName %>', () => {
  it('exports a valid component', () => {
    expect(<%= importName %>).toBeAComponent()
  })
})
