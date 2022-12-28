type LastPositionType = {x: number, y: number, z: number}
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
    private scroll: HTMLDivElement
    private footer: HTMLElement
    private lastPosition: LastPositionType
    constructor() {
        this.lastPosition = {x: 0, y: 0, z: 0}
        this.scrollY = 0
        this.allHeightBody = 0
        this.rightPosition = 0
        this.initialPosition = 0
        this.maxScrollPosition = 0
        this.windthScrollWrapper = 0
        this.scrollWrapper = document.querySelector('.scroll_wrapper') as HTMLDivElement
        this.scroll = document.querySelector('.scroll') as HTMLDivElement
        this.paralaxImg = document.querySelector(".paralax_layer") as HTMLImageElement
        this.cursor = document.querySelector('.cursor') as HTMLDivElement
        this.subContainerGreetings = document.querySelector('.sub_container_greetings') as HTMLDivElement
        this.header = document.querySelector('.header') as HTMLElement
        this.main = document.querySelector('.main') as HTMLElement
        this.footer = document.querySelector('.footer') as HTMLElement
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
        this.allHeightBody = 0 - window.innerHeight
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
        // получаем стили чтобы в последующем получить отступы у элемента
        const style = getComputedStyle(this.main.lastElementChild as HTMLElement)
        // устанавливаем максимальную возможность скролла с учетом количества вложенных элементов в скролл контейнер и общего количества контейнеров внутри тега body с вычетом ширины скрола
        document.body.style.height = (this.windthScrollWrapper + this.allHeightBody + window.innerHeight) - parseInt(style.getPropertyValue('margin-top')) + 'px'
        // устанавливаем следующему элементу за main контейнером margin-top = длине скролла с вычетом ширины скрола
        const mains = (this.main.lastElementChild as HTMLElement)
        mains.style.marginTop = (this.windthScrollWrapper) + 'px'
    }
    private positionCursorHandler = (event: MouseEvent) => {
        // ограничиваем кастомный курсор в областе видимости горизонтального скролла
        if (event.pageY > this.initialPosition && event.pageY < this.maxScrollPosition + this.scrollWrapper.offsetHeight && window.innerWidth > 1050) {
            this.cursor.style.display = "block"
            this.cursor.style.position = 'fixed'
            this.cursor.style.top = event.clientY + 'px'
            this.cursor.style.left = event.clientX + 'px'
        } else if (window.innerWidth < 1050) {
            this.cursor.style.position = 'absolute'
            this.cursor.style.display = "block"
            this.cursor.style.top = -150 + 'px'
            this.cursor.style.left = 80 + 'px'
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
            // складываем положение прокрутки и вычетаем начальное положение и прибавляем отклонение от левой части экрана, для сохранения правильного положения на больших экранах
            this.scrollWrapper.style.left = -(this.scrollY - this.initialPosition) + this.scroll.getBoundingClientRect().x + 'px'
        }
        // проверяем чтобы позиция скролла окна была меньше минимально разрешенной начальной позиции скролла
        if (this.scrollY <= this.initialPosition) {
            // устанавливаем позицию скролл контейнера относительно положения main контейнера (для экранов больше 1440px)
            this.scrollWrapper.style.left = this.scroll.getBoundingClientRect().x + 'px'
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
    private updateLastPosition = (element: HTMLElement) => {

        if(element.style.transform === '') {

            this.lastPosition = {
                x: 0,
                y: 0,
                z: 0
            };

            return false
        }

        const values = element.style.transform.split(/\w+\(|\);?/)
        const transform = values[1].split(/,\s?/g).map(numStr => parseInt(numStr))

        this.lastPosition = {
            x: transform[0],
            y: transform[1],
            z: transform[2]
        };
    }
    private setTranslate = (x, y, element) => {
        element.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";
    }
    private scrollLoop = () => {
        const firstFrameX = (window.pageYOffset * -.35 - this.paralaxImg.offsetHeight * -.27)
        const firstFrameY = (window.pageYOffset * .88 - this.paralaxImg.offsetHeight * .98)
        this.setTranslate(firstFrameX, firstFrameY, this.paralaxImg)
        this.updateLastPosition(this.paralaxImg)
        
    }
    eventListenerHandler = () => {
        this.resizeHandler()
        this.horizontalScrollingHandler()
        window.addEventListener("DOMContentLoaded", this.scrollLoop)
        window.addEventListener("scroll", this.scrollLoop);
        window.addEventListener('resize', this.resizeHandler)
        window.addEventListener('scroll', this.horizontalScrollingHandler)
        window.addEventListener('mousemove', this.positionCursorHandler)
    }
}

const horizontalScroll = new HorizontalScrolling()

horizontalScroll.eventListenerHandler()
