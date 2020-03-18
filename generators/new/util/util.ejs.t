---
to: "src/utils/<%= h.changeCase.pascal(name) %>.js"
---
<%
  const fileName = h.changeCase.pascal(name)
  const importName = h.changeCase.camel(fileName)
%>export default function <%= importName %>() {
  return 'hello'
}
