const subContainerGreetings = document.querySelector('.sub_container_greetings')
const scrollWrapper = document.querySelector('.scroll_wrapper')
const header = document.querySelector('.header')
const footer = document.querySelector('.footer')
// устанавливаем переменную отвественную за ширину блоков
let windthScrollWrapper = 0
// функция отвечающая за горизонтальный скролл
const horizontalScrollingHandler = () => {
    // устанавливаем позицию скролла по вертикали
    const scrollY = window.scrollY
    // устанавливаем начальную позициюдля возможности скролла для того чтобы в последующем задать фиксируванную позицию скролл контейнера
    const initialPosition = (subContainerGreetings.offsetHeight + header.offsetHeight)
    // задаем максимальную позицию для окончания скролла вертикального контейнера (обшая длинна контейнера + длинна первого блока + (ширина хедер контейнера + отступ от анимации) - ширина пользовательского окна (если не сделать будет пустое поле в ширину 1 экрана))
    const maxScrollPosition = ((windthScrollWrapper + window.innerHeight + (header.offsetHeight * 2)) - window.innerWidth - 123)
    // позиция элемента от правого края
    const rightPosition = -(windthScrollWrapper - scrollWrapper.offsetWidth)
    // проверяем позицию скролла с инициализированной позицией и максимально разрешенной позицией для скролла
    if (scrollY > initialPosition && scrollY < maxScrollPosition) {
        scrollWrapper.style.top = 0
        scrollWrapper.style.position = "fixed"
        scrollWrapper.style.left = -(scrollY - initialPosition) + 'px'
    }
    // проверяем чтобы позиция скролла окна была меньше минимально разрешенной начальной позиции скролла
    if (scrollY <= initialPosition) {
        // устанавливаем позицию скролл контейнера в 0
        scrollWrapper.style.left = 0
        // устанавливаем позицию скролла в начальное положение
        scrollWrapper.style.position = "initial"
    }
    // проверяем чтобы позиция скролла окна была больше максимальной разрешенной позиции для скролла
    if (scrollY >= maxScrollPosition) {
        // устанавливаем позицию обсолютную для 
        scrollWrapper.style.position = "absolute"
        scrollWrapper.style.left = rightPosition + 'px'
        // скрывает элемент с экрана пользователя
        scrollWrapper.style.top = (maxScrollPosition - (window.innerHeight + header.offsetHeight)) + 'px'
    }
}
// функция отвечающая за отслеживание ширины скролла
const resizeHandler = () => {
    // обнуляем длину скролла
    windthScrollWrapper = 0
    // получаем длину всех элементов внутри обертки скролл контейнера для того чтобы получить длину скролл контейнера
    Array.from(scrollWrapper.children).forEach((node) => {
        // получаем стили чтобы в последующем получить отступы у элемента
        const style = getComputedStyle(node)
        // поочередно складываем все в одну переменную
        windthScrollWrapper += (node.offsetWidth + parseInt(style.marginLeft) + parseInt(style.marginRight))
    })
    // устанавливаем максимальную возможность скролла с учетом количества вложенных элементов в скролл контейнер и общего количества контейнеров внутри
    document.body.style.height = (windthScrollWrapper + (5 * window.innerHeight)) + 'px'
}
// отслеживаем горизонтальный скролл
window.addEventListener('scroll', horizontalScrollingHandler)
// отслеживаем изменение размера монитора
window.addEventListener("resize", resizeHandler)
// первоначально вызываем функцию ответственную за отслеживание ширины скролла чтобы установить начальное положение 
resizeHandler()
// после вызываем функцию для отслеживания позиции скролла
horizontalScrollingHandler()
