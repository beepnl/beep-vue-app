---
to: "src/router/layouts/<%= h.changeCase.pascal(name) %>.unit.js"
---
<%
  const fileName = h.changeCase.pascal(name)
  const importName = h.changeCase.pascal(fileName) + 'Layout'
%>import <%= importName %> from './<%= fileName %>'

describe('@layouts/<%= fileName %>', () => {
  it('renders its content', () => {
    const slotContent = '<p>Hello!</p>'
    const { element } = shallowMount(<%= importName %>, {
      slots: {
        default: slotContent,
      },
    })
    expect(element.innerHTML).toContain(slotContent)
  })
})
