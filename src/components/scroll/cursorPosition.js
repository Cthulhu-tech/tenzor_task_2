const cursor = document.querySelector('.cursor')

const positionCursorHandler = (event) => {
    cursor.style.display = "block"
    cursor.style.top = event.clientY + 'px'
    cursor.style.left = event.clientX + 'px'
}

window.addEventListener('mousemove', positionCursorHandler)