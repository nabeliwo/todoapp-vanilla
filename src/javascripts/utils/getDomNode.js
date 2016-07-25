export default str => {
  const template = document.createElement('div');
  let dom = null;

  template.style.display = 'none';
  template.innerHTML = str;
  document.body.appendChild(template);

  dom = template.childNodes[1];
  document.body.removeChild(template);

  return dom;
};
