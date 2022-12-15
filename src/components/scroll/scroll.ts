class HorizontalScrolling {
    private scrollY: number
    private allHeightBody: number
    private initialPosition: number
    private maxScrollPosition: number
    private rightPosition: number
    private windthScrollWrapper: number
    private subContainerGreetings: HTMLDivElement
    private scrollWrapper: HTMLDivElement
    private header: HTMLElement
    private main: HTMLElement
    private cursor: HTMLDivElement
    private paralaxImg: HTMLImageElement
    constructor() {
        this.scrollY = 0
        this.allHeightBody = 0
        this.rightPosition = 0
        this.initialPosition = 0
        this.maxScrollPosition = 0
        this.windthScrollWrapper = 0
        this.paralaxImg = document.querySelector(".paralax_background") as HTMLImageElement
        this.cursor = document.querySelector('.cursor') as HTMLDivElement
        this.subContainerGreetings = document.querySelector('.sub_container_greetings') as HTMLDivElement
        this.scrollWrapper = document.querySelector('.scroll_wrapper') as HTMLDivElement
        this.header = document.querySelector('.header') as HTMLElement
        this.main = document.querySelector('.main') as HTMLElement
    }
    private updateScrollWrapperWidth = () => {
        this.windthScrollWrapper = 0 - this.scrollWrapper.offsetWidth
        Array.from(this.scrollWrapper.children).forEach((node) => {
            // получаем стили чтобы в последующем получить отступы у элемента
            const style = getComputedStyle(node)
            // поочередно складываем все в одну переменную
            this.windthScrollWrapper += ((node as HTMLElement).offsetWidth + parseInt(style.marginLeft) + parseInt(style.marginRight))
        })
    }
    private updateHeightBody = () => {
        // переменная отвечающая за общую ширину body контейнера
        this.allHeightBody = 0
        // получаем длину всех элементов внутри обертки скролл контейнера для того чтобы получить длину скролл контейнера
        Array.from(document.body.children).forEach((node) => {
            // получаем общую ширину всех контейнеров
            this.allHeightBody += (node as HTMLElement).offsetHeight
        })
    }
    private resizeHandler = () => {
        // обнуляем длину скролла и вычитаем
        this.updateScrollWrapperWidth()
        this.updateHeightBody()
        // устанавливаем максимальную возможность скролла с учетом количества вложенных элементов в скролл контейнер и общего количества контейнеров внутри тега body с вычетом ширины скрола
        document.body.style.height = (this.windthScrollWrapper + this.allHeightBody) + 'px'
        // устанавливаем следующему элементу за main контейнером margin-top = длине скролла с вычетом ширины скрола
        const mains = (this.main.nextElementSibling as HTMLElement)
        mains.style.marginTop = (this.windthScrollWrapper) + 'px'
    }
    private positionCursorHandler = (event: MouseEvent) => {
        // ограничиваем кастомный курсор в областе видимости горизонтального скролла
        if (event.pageY > this.initialPosition && event.pageY < this.maxScrollPosition + this.scrollWrapper.offsetHeight) {
            this.cursor.style.display = "block"
            this.cursor.style.top = event.clientY + 'px'
            this.cursor.style.left = event.clientX + 'px'
        } else {
            this.cursor.style.display = "none"
        }
    }
    private horizontalScrollingHandler = () => {
        // устанавливаем позицию скролла по вертикали
        this.scrollY = window.scrollY
        // устанавливаем начальную позициюдля возможности скролла для того чтобы в последующем задать фиксируванную позицию скролл контейнера
        this.initialPosition = (this.subContainerGreetings.offsetHeight + this.header.offsetHeight)
        // задаем максимальную позицию для окончания скролла вертикального контейнера (обшая длинна контейнера + длинна первого блока + (ширина хедер контейнера + отступ от анимации) - ширина пользовательского окна (если не сделать будет пустое поле в ширину 1 экрана))
        this.maxScrollPosition = ((this.windthScrollWrapper + window.innerHeight + this.header.offsetHeight))
        // позиция элемента от правого края
        this.rightPosition = -(this.windthScrollWrapper)
        // проверяем позицию скролла с инициализированной позицией и максимально разрешенной позицией для скролла
        if (this.scrollY > this.initialPosition && this.scrollY < this.maxScrollPosition) {
            this.scrollWrapper.style.top = '0'
            this.scrollWrapper.style.position = "fixed"
            this.scrollWrapper.style.left = -(this.scrollY - this.initialPosition) + 'px'
        }
        // проверяем чтобы позиция скролла окна была меньше минимально разрешенной начальной позиции скролла
        if (this.scrollY <= this.initialPosition) {
            // устанавливаем позицию скролл контейнера в 0
            this.scrollWrapper.style.left = '0'
            // устанавливаем позицию скролла в начальное положение
            this.scrollWrapper.style.position = "initial"
        }
        // проверяем чтобы позиция скролла окна была больше максимальной разрешенной позиции для скролла
        if (this.scrollY >= this.maxScrollPosition) {
            // устанавливаем позицию обсолютную для
            this.scrollWrapper.style.position = "absolute"
            this.scrollWrapper.style.left = this.rightPosition + 'px'
            // скрывает элемент с экрана пользователя
            this.scrollWrapper.style.top = (this.maxScrollPosition - (window.innerHeight + this.header.offsetHeight)) + 'px'
        }
    }
    private setTranslate = (x, y, el) => {
            el.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";
    }
    private scrollLoop = () => {
        console.log(window.innerHeight , this.scrollY)
        if(window.innerHeight > this.scrollY)
            this.setTranslate((window.pageYOffset * -0.5 + (this.paralaxImg.offsetHeight/2 + 60)), (window.pageYOffset * 0.05 - 220), this.paralaxImg);
        requestAnimationFrame(this.scrollLoop);
    }
    eventListenerHandler = () => {
        this.resizeHandler()
        this.horizontalScrollingHandler()
        window.addEventListener("DOMContentLoaded", this.scrollLoop);
        window.addEventListener('resize', this.resizeHandler)
        window.addEventListener('scroll', this.horizontalScrollingHandler)
        window.addEventListener('mousemove', this.positionCursorHandler)
    }
}

const horizontalScroll = new HorizontalScrolling()

horizontalScroll.eventListenerHandler()
