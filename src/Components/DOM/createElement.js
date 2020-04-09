export default function createElement(element, ...classes) {
  const newElement = document.createElement(element);

  classes.forEach(el => {
    newElement.classList.add(el);
  });

  return newElement;
}
