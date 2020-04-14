---
to: "src/router/views/<%= h.changeCase.pascal(name) %>.unit.js"
---
<%
  const fileName = h.changeCase.pascal(name)
  const importName = h.changeCase.pascal(fileName)
%>import <%= importName %> from './<%= fileName %>'

describe('@views/<%= fileName %>', () => {
  it('is a valid view', () => {
    expect(<%= importName %>).toBeAViewComponent()
  })
})
