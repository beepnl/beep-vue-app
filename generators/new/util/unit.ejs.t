---
to: "src/utils/<%= h.changeCase.pascal(name) %>.unit.js"
---
<%
  const fileName = h.changeCase.pascal(name)
  const importName = h.changeCase.camel(fileName)
%>import <%= importName %> from './<%= fileName %>'

describe('@utils/<%= fileName %>', () => {
  it('says hello', () => {
    const result = <%= importName %>()
    expect(result).toEqual('hello')
  })
})
