type responseType = {
    name: string
    phone: string
    email: string
    question: string
}

class Form {
    server: string
    form: HTMLFormElement
    response: responseType
    inputName: HTMLInputElement
    inputPhone: HTMLInputElement
    inputEmail: HTMLInputElement
    questionInput: HTMLInputElement
    allInputForm: HTMLInputElement[]
    constructor() {
        this.server = ''
        this.response = {name: '', phone: '', email: '', question: ''}
        this.form = document.querySelector('.wrapper_form') as HTMLFormElement
        this.inputName = document.querySelector('.input_name') as HTMLInputElement
        this.inputPhone = document.querySelector('.input_phone') as HTMLInputElement
        this.inputEmail = document.querySelector('.input_email') as HTMLInputElement
        this.questionInput = document.querySelector('.input_question') as HTMLInputElement
        this.allInputForm = Array.from(document.querySelectorAll('.form_input')) as HTMLInputElement[]
    }
    private returnInputValueLength = (input: HTMLInputElement) => {
        return (input.value).trim().length
    }
    private inputNameHandler = (event: Event) => {
        const target = (event.target as HTMLInputElement) 
        // получаем длину значения
        const inputNameValueLenght = this.returnInputValueLength(target)
        // проверяем значение на соответствие
        target.classList.toggle('input_error', inputNameValueLenght === 0)
        target.classList.toggle('input_filed', inputNameValueLenght >= 1)
        // заносим значение в переменую response
        this.inputHandle(target)
    }
    private inputPhoneHandler = (event: Event) => {
        const target = (event.target as HTMLInputElement)
        // удаляем все что не является цифрами и создаем массив данных с номером телефона ['0 000 000 00 00','0', '000', '000', '00', '00']
        const value = target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/) as RegExpMatchArray
        // создаем переменную сообщения
        let inputMask = ''
        // проверям присутствие хотя-бы 1 числа в номере и добавляем ( после ввода первого числа номера для отображения в поле ввода
        if(value[1])
            inputMask += '+' + (value[1] === '8' ? '7' : value[1])
        // проверям присутствие хотя-бы 2 чисел в номере и добавляем ) после ввода 3 числа номера для отображения в поле ввода
        if(value[2])
            inputMask += ' (' + value[2]
        // проверям присутствие хотя-бы 4 чисел в номере и добавляем - после ввода 5 числа номера для отображения в поле ввода
        if(value[3])
            inputMask += ') ' + value[3]
        // проверям присутствие хотя-бы 8 чисел в номере и добавляем - после 9 числа номера для отображения в поле ввода
        if(value[4])
            inputMask += '-' + value[4]
        // проверям присутствие хотя-бы 10 чисел в номере и добавляем - после 10 числа номера для отображения в поле ввода
        if(value[5])
            inputMask += '-' + value[5]
        // устанавливаем число вместе с масской  
        target.value = inputMask
        // удаляем из числа вне не числовые значения
        const inputPhoneValue = inputMask.replace(/\D/g, '')
        // проверям значение на соответствие
        target.classList.toggle('input_filed', inputPhoneValue.length === 11)
        target.classList.toggle('input_error', inputPhoneValue.length < 11)
        // заносим значение в переменую response
        this.inputHandle(target)
    }
    private inputEmailHandler = (event: Event) => {
        const target = (event.target as HTMLInputElement)
        // проверяем значение на максу string@string.string
        const value = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(target.value)
        // проверям значение на соответствие
        target.classList.toggle('input_filed', value)
        target.classList.toggle('input_error', !value)
        // заносим значение в переменую response
        this.inputHandle(target)
    }
    private inputQuestionInputHandler = (event: Event) => {
        const target = (event.target as HTMLInputElement)
        // заносим значение в переменную response
        this.inputHandle(target)
    }
    private inputHandle = (target: HTMLInputElement) => {
        // заносим значение в переменую response = {...разварачиваем массив, [имя_поля_ввода]: значение_поля_ввода}
        this.response = {...this.response, [target.name]: target.value}
    }
    private formResponse = (event: SubmitEvent) => {
        // запрешаем отправку формы путем html (можно просто удалить данную функцию если не нужно отправлять через ajax)
        event.preventDefault()
        let error = false // ставим переменную на проверку ошибки
        this.allInputForm.forEach((input) => {
            // если элемент содержит ошибку или содержит не заполненое поле то запрешаем отправку запроса на сервер (и не имеет класса input_question)
            if((input.classList.contains('input_error') || !input.classList.contains('input_filed') && !input.classList.contains('input_question'))){
                input.classList.add('input_error') // в таком случаем добавляем класс ошибки чтобы обозначить пользователю что тут не заполненое поле
                error = true // ставим флаг ошибки в положительное значение
            }
        })
        // проверяем флаг ошибки, если он положителен, то запрешаем отправку формы
        if(error)
            return false

        // вызываем отправку формы не сервер
        this.fetchToServer()
    }
    private fetchToServer = () => {
        fetch(this.server, {
            method: 'POST', // отправляем постом
            mode: 'cors', // ставим корс для сервера
            headers: {
              'Content-Type': 'application/json'// отправляем типом json 
            },
            redirect: 'follow', // разрешаем редирект
            body: JSON.stringify(this.response) // наши отправляемые данные
        })
    }
    handlerAllInput = () => {
        this.form.addEventListener('submit', this.formResponse)
        this.inputName.addEventListener('input', this.inputNameHandler)
        this.inputPhone.addEventListener('input', this.inputPhoneHandler)
        this.inputEmail.addEventListener('input', this.inputEmailHandler)
        this.questionInput.addEventListener('input', this.inputQuestionInputHandler)
    }
}

//создаем класс
const FormHadler = new Form()
//вызываем отслежживание при загрузке страницы
document.addEventListener('DOMContentLoaded', FormHadler.handlerAllInput)
