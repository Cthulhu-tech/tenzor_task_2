type optionsObserver = {
    rootMargin: string,
    threshold: number
}

class Folder {
    options: optionsObserver
    allFolder: HTMLDivElement[]
    constructor() {
        this.options = {rootMargin: '25% 0px', threshold: 1}
        this.allFolder = Array.from(document.querySelectorAll('.animation_observer'))
    }
    private observerFolder = (entry: IntersectionObserverEntry, observer: IntersectionObserver) => {
        const child = (entry.target.firstElementChild as Element)
        if(entry.isIntersecting) {
            child.classList.add('animation_dropping')
        }else {
            child.classList.remove('animation_dropping')
        }
    }
    private folderObserver = () => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((folder) => {
                this.observerFolder(folder, observer)
            })
        },
        this.options)
        this.allFolder.forEach((folder) => {
            observer.observe(folder)
        })
    }
    observe = () => {
        document.addEventListener('DOMContentLoaded', this.folderObserver)
    }
}

const folder = new Folder()

folder.observe()