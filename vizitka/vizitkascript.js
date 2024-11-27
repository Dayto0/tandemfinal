const translations = {
    ru: {
        brandTitle: "Тандем",
        sendingTitle: "Калькулятор цен печати визиток",
        widthLabel: "Ширина (см):",
        heightLabel: "Высота (см):",
        materialLabel: "Материал:",
        densityLabel: "Плотность печати:",
        calculateBtn: "Рассчитать",
        sendBtn: "Зарегистрировать заказ",
        result: "Цена: ",
        namePlaceholder: "Введите имя",
        phonePlaceholder: "Введите номер телефона",
        widthPlaceholder: "Введите ширину (см)",
        heightPlaceholder: "Введите высоту (см)",
        quantityPlaceholder: "Введите количество"
    },
    am: {
        brandTitle: "Տանդեմ",
        sendingTitle: "Վիզիտների տպման գնի հաշվարկիչ",
        widthLabel: "Լայնություն (սմ):",
        heightLabel: "Բարձրություն (սմ):",
        materialLabel: "Մատերիալ:",
        densityLabel: "Տպման խտությունը:",
        calculateBtn: "Հաշվել",
        sendBtn: "Գրանցեք ձեր պատվերը",
        result: "Գինը: ",
        namePlaceholder: "Մուտքագրեք անունը",
        phonePlaceholder: "Մուտքագրեք հեռախոսահամարը",
        widthPlaceholder: "Մուտքագրեք լայնությունը (սմ)",
        heightPlaceholder: "Մուտքագրեք բարձրությունը (սմ)",
        quantityPlaceholder: "Մուտքագրեք քանակը"
    },
    en: {
        brandTitle: "Tandem",
        sendingTitle: "Business Card Printing Price Calculator",
        widthLabel: "Width (cm):",
        heightLabel: "Height (cm):",
        materialLabel: "Material:",
        densityLabel: "Printing density:",
        calculateBtn: "Calculate",
        sendBtn: "Register Order",
        result: "Price: ",
        namePlaceholder: "Enter name",
        phonePlaceholder: "Enter phone number",
        widthPlaceholder: "Enter width (cm)",
        heightPlaceholder: "Enter height (cm)",
        quantityPlaceholder: "Enter quantity"
    }
};

// Функция для изменения языка
function changeLanguage(language) {
    document.getElementById("brandTitle").innerText = translations[language].brandTitle;
    document.getElementById("sendingTitle").innerText = translations[language].sendingTitle;
    document.getElementById("widthLabel").innerText = translations[language].widthLabel;
    document.getElementById("heightLabel").innerText = translations[language].heightLabel;
    document.getElementById("materialLabel").innerText = translations[language].materialLabel;
    document.getElementById("densityLabel").innerText = translations[language].densityLabel;
    document.getElementById("calculateBtn").innerText = translations[language].calculateBtn;
    document.getElementById("sendBtn").innerText = translations[language].sendBtn;
    document.getElementById("result").innerText = translations[language].result;
    document.title = translations[language].sendingTitle;

    document.getElementById("width").placeholder = translations[language].widthPlaceholder;
    document.getElementById("height").placeholder = translations[language].heightPlaceholder;
    document.getElementById("quantity").placeholder = translations[language].quantityPlaceholder;
}

// Устанавливаем язык по умолчанию
changeLanguage('am'); // по умолчанию русский

// Функция для расчёта стоимости
function calculatePrice() {
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);
    const materialCost = parseFloat(document.getElementById('material').value);
    const densityCost = parseFloat(document.getElementById('density').value);
    const quantity = parseInt(document.getElementById('quantity').value);

    if (isNaN(width) || isNaN(height) || isNaN(quantity)) {
        alert("Пожалуйста, введите правильные данные!");
        return;
    }

    const area = width * height;
    let basePrice = area * materialCost;
    basePrice += densityCost;

    // Рассчитываем цену с учетом количества
    const totalPrice = basePrice * quantity;

    // Округляем цену
    const resultPrice = Math.round(totalPrice);
    document.getElementById('result').innerText = `Цена: ${resultPrice} драм.`;
}

// Функция для отправки данных на Telegram
function sendOrder() {
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);
    const materialCost = parseFloat(document.getElementById('material').value);
    const densityCost = parseFloat(document.getElementById('density').value);
    const quantity = parseInt(document.getElementById('quantity').value);

    if (isNaN(width) || isNaN(height) || isNaN(quantity)) {
        alert("Пожалуйста, введите правильные данные!");
        return;
    }

    const area = width * height;
    let basePrice = area * materialCost;
    basePrice += densityCost;

    // Рассчитываем общую цену
    const totalPrice = Math.round(basePrice * quantity);
    const resultPrice = `Цена: ${totalPrice} драм.`;

    // Проверка обязательных полей
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    if (!name || !phone) {
        alert("Пожалуйста, заполните все поля!");
        return;
    }

    // Получаем текущую дату и время
    const currentDate = new Date();
    const options = {
        timeZone: 'Asia/Yerevan',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    };

    const dateFormatter = new Intl.DateTimeFormat('ru-RU', options);
    const dateString = dateFormatter.format(currentDate);

    // Формируем сообщение для отправки в Telegram
    const message = `
    Новый заказ:
    \n Печать визиток
    \n👤Имя: ${name}
    \n📞Телефон: ${phone}
    \n📐Размеры: ${width} x ${height} см
    \n📄Материал: ${document.getElementById('material').selectedOptions[0].text}
    \n📈Плотность печати: ${document.getElementById('density').selectedOptions[0].text}
    \n💰Цена: ${resultPrice}
    \n📅Дата заказа: ${dateString}`;

    const token = '7475133843:AAGdtr_FAPQmn772HJOyU1gYRMK8hYJsoeY';
    const chatId = '878014553';
    const apiUrl = `https://api.telegram.org/bot${token}/sendMessage`;

    const url = `${apiUrl}?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    // Отправка данных в Telegram
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                alert("Ваш заказ успешно отправлен!");
            } else {
                alert("Ошибка при отправке заказа. Попробуйте снова.");
            }
        })
        .catch(error => {
            alert("Ошибка при отправке заказа. Попробуйте снова.");
            console.error(error);
        });
}
