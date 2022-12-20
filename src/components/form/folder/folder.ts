class Folder {
    allFolder: HTMLDivElement[]
    constructor() {
        this.allFolder = Array.from(document.querySelectorAll('.wrapper_folder'))
    }
    private observerFolder = (entry: IntersectionObserverEntry, observer: IntersectionObserver) => {
        if(entry.isIntersecting) {
            entry.target.classList.add('animation_dropping')
        }
    }
    private folderObserver = () => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((folder) => {
                this.observerFolder(folder, observer)
            })
        })
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