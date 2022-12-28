class GreetingAnimationUp {
    private subContainerGretings: HTMLDivElement
    constructor() {
        this.subContainerGretings = document.querySelector('.sub_container_greetings') as HTMLDivElement    
    }
    private observerGreetingsContainer = (entry: IntersectionObserverEntry, observer: IntersectionObserver) => {
        const entryELement = entry.target as HTMLElement
        if(entryELement.getBoundingClientRect().top <= 0)
            entryELement.style.background = `rgba(0,0,0,${entry.intersectionRatio})`
        else
            entryELement.style.background = 'rgba(0,0,0,1)'
    }
    private animationObserver = () => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((folder) => {
                this.observerGreetingsContainer(folder, observer)
            })
        },{
            threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
        })
        observer.observe(this.subContainerGretings)
    }
    AnimationStart = () => {
        this.animationObserver()
    }
}

const animationGreetingsContainer = new GreetingAnimationUp()

animationGreetingsContainer.AnimationStart()

