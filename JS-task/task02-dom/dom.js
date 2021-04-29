function changeElements() {
    const exampleElements = document.querySelectorAll('ul div.example');
    exampleElements.forEach(item => {
        item.style.backgroundColor = 'red';
        item.style.fontStyle = 'italic';
    })
}


export { changeElements };