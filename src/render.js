export const renderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend'
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
