📦resources - папка с генерированными файлами

 📂assets - папка с файлами
 
 ┃ ┣ 📂backgroundParalax - хранит файлы связанные с задним фоном
 
 ┃ ┃ ┗ 📜background.png 
 
 ┃ ┣ 📂fonts - хранит файлы связанные с текстом
 
 ┃ ┃ ┣ 📜handelGothicTL.ttf
 
 ┃ ┃ ┗ 📜helvetica_regular.otf
 
 ┃ ┣ 📂imgScroll - хранит картинки скролла
 
 ┃ ┃ ┣ 📜DSC02411 1.png
 
 ┃ ┃ ┣ 📜DSC02624 1.png
 
 ┃ ┃ ┣ 📜IMG_4582.png
 
 ┃ ┃ ┗ 📜IMG_4596 1.png
 
 ┃ ┗ 📂svg - хранит svg картинки
 
 ┃ ┃ ┣ 📜cursor.svg - картинка курсора
 
 ┃ ┃ ┗ 📜logo.svg  - картинка лого
 
 ┣ 📂css  - папка которая хранит минимизированные стили
 
 ┃ ┣ 📜style.css - минимизированные стили
 
 ┃ ┗ 📜style.css.map - карта минимизированных стилей
 
 ┣ 📂js - папка которая хранит js код
 
 ┃ ┗ 📜script.js - исходный файл js
 
 ┗ 📜index.html - исходный файл html


📦src

 ┣ 📂assets - папка в которой храняться все подключаймые файлы
 
 ┃ ┣ 📂backgroundParalax
 
 ┃ ┃ ┗ 📜background.png
 
 ┃ ┣ 📂fonts
 
 ┃ ┃ ┣ 📜handelGothicTL.ttf
 
 ┃ ┃ ┗ 📜helvetica_regular.otf
 
 ┃ ┣ 📂imgScroll
 
 ┃ ┃ ┣ 📜DSC02411 1.png
 
 ┃ ┃ ┣ 📜DSC02624 1.png
 
 ┃ ┃ ┣ 📜IMG_4582.png
 
 ┃ ┃ ┗ 📜IMG_4596 1.png
 
 ┃ ┗ 📂svg
 
 ┃ ┃ ┣ 📜cursor.svg
 
 ┃ ┃ ┗ 📜logo.svg
 
 ┣ 📂components - храняться компоненты страницы
 
 ┃ ┣ 📂footer - footer компонент
 
 ┃ ┃ ┣ 📜footer.pug
 
 ┃ ┃ ┗ 📜footer.scss
 
 ┃ ┣ 📂form - храниться компонент отвественный за форму
 
 ┃ ┃ ┣ 📂folder - подкомпонент формы связанный с логикой папок
 
 ┃ ┃ ┃ ┣ 📜folder.pug
 
 ┃ ┃ ┃ ┣ 📜folder.scss
 
 ┃ ┃ ┃ ┣ 📜folder.ts - отвечает за анимацию папок
 
 ┃ ┃ ┃ ┣ 📜folderPosition.scss - отвечает за анимацию папок
 
 ┃ ┃ ┃ ┗ 📜folderText.scss - файл отвественный за текст в папках
 
 ┃ ┃ ┣ 📂title
 
 ┃ ┃ ┃ ┣ 📜title.pug
 
 ┃ ┃ ┃ ┗ 📜title.scss
 
 ┃ ┃ ┣ 📜form.pug
 
 ┃ ┃ ┣ 📜form.scss
 
 ┃ ┃ ┗ 📜form.ts - отвечает за проверку формы
 
 ┃ ┣ 📂greetings - приветственный контейнер (самый первый фрейм)
 
 ┃ ┃ ┣ 📜greetings.pug
 
 ┃ ┃ ┣ 📜greetings.scss
 
 ┃ ┃ ┗ 📜grettingsAnimation.scss - отвечает за анимацию контейнера
 
 ┃ ┣ 📂header - заголовок сайта (также заменяет nav)
 
 ┃ ┃ ┣ 📜header.pug 
 
 ┃ ┃ ┗ 📜header.scss
 
 ┃ ┗ 📂scroll - скролл компонент
 
 ┃ ┃ ┣ 📂clients - 4 фрейм скролла (с заголовком: продлите клиента )
 
 ┃ ┃ ┃ ┣ 📜clients.pug
 
 ┃ ┃ ┃ ┗ 📜clients.scss
 
 ┃ ┃ ┣ 📂engage - 1 фрейм скролла (с заголовком: привлекайте)
 
 ┃ ┃ ┃ ┣ 📜engage.pug
 
 ┃ ┃ ┃ ┗ 📜engage.scss
 
 ┃ ┃ ┣ 📂select - 2 фрейм скролла (с заголовком: подберите)
 
 ┃ ┃ ┃ ┣ 📜select.pug
 
 ┃ ┃ ┃ ┗ 📜select.scss
 
 ┃ ┃ ┣ 📂selling  - 3 фрейм скролла (с заголовком: продайте)
 
 ┃ ┃ ┃ ┣ 📜selling.pug
 
 ┃ ┃ ┃ ┗ 📜selling.scss
 
 ┃ ┃ ┣ 📜scroll.pug - компонент скролла
 
 ┃ ┃ ┣ 📜scroll.scss
 
 ┃ ┃ ┗ 📜scroll.ts - отвечает за логику скролла
 
 ┣ 📂layout
 
 ┃ ┗ 📜main.pug
 
 ┣ 📂style
 
 ┃ ┣ 📜color.scss - все цвета используемые на странице
 
 ┃ ┣ 📜folderMixin.scss - миксины связанные с папками
 
 ┃ ┣ 📜global.scss - глобальные стили (универсальные)
 
 ┃ ┗ 📜mixin.scss - миксины общие
 
 ┗ 📜index.pug - исходный файл
 
