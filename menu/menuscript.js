const translations = {
    ru: {
        brandTitle: "Тандем",
        sendingTitle: "Калькулятор цен печати меню", // Изменено на "Калькулятор цен меню"
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
        heightPlaceholder: "Введите высоту (см)"
    },
    am: {
        brandTitle: "Տանդեմ",
        sendingTitle: "Մենյուի Գնի հաշվարկում ", // Перевод на армянский
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
        heightPlaceholder: "Մուտքագրեք բարձրությունը (սմ)"
    },
    en: {
        brandTitle: "Tandem",
        sendingTitle: "Menu Printing Price Calculator", // Перевод на английский
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
        heightPlaceholder: "Enter height (cm)"
    }
};

// Функция для изменения языка
function changeLanguage(language) {
    document.getElementById("brandTitle").innerText = translations[language].brandTitle; // Обновление текста заголовка бренда
    document.getElementById("sendingTitle").innerText = translations[language].sendingTitle; // Обновление заголовка "Калькулятор цен меню"
    document.getElementById("widthLabel").innerText = translations[language].widthLabel;
    document.getElementById("heightLabel").innerText = translations[language].heightLabel;
    document.getElementById("materialLabel").innerText = translations[language].materialLabel;
    document.getElementById("densityLabel").innerText = translations[language].densityLabel;
    document.getElementById("calculateBtn").innerText = translations[language].calculateBtn;
    document.getElementById("sendBtn").innerText = translations[language].sendBtn;
    document.getElementById("result").innerText = translations[language].result;
    document.title = translations[language].sendingTitle;

    // Переводим placeholder для всех полей
    document.getElementById("name").placeholder = translations[language].namePlaceholder;
    document.getElementById("phone").placeholder = translations[language].phonePlaceholder;
    document.getElementById("width").placeholder = translations[language].widthPlaceholder;
    document.getElementById("height").placeholder = translations[language].heightPlaceholder;
}

// Устанавливаем язык по умолчанию
changeLanguage('am'); // по умолчанию армянский

// Функция для расчёта стоимости
function calculatePrice() {
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);
    const materialCost = parseFloat(document.getElementById('material').value);
    const densityCost = parseFloat(document.getElementById('density').value);

    if (isNaN(width) || isNaN(height)) {
        alert("Пожалуйста, введите правильные размеры!");
        return;
    }

    // Переводим размеры из см в м
    const widthInMeters = width * 0.01;
    const heightInMeters = height * 0.01;

    const area = widthInMeters * heightInMeters;
    let basePrice = area * materialCost;
    basePrice += densityCost;

    // Рассчитываем цену от реальной (не меняем ее вниз)
    let minPrice = basePrice;

    // Цена до — изменяется динамически (+10% от базовой цены)
    let maxPrice = basePrice + (basePrice * 0.1);

    // Округляем обе цены
    minPrice = Math.round(minPrice);
    maxPrice = Math.round(maxPrice);

    const resultText = `От ${minPrice} до ${maxPrice} драм.`;
    document.getElementById('result').innerText = resultText;
}

// Функция для отправки данных на Telegram
function sendOrder() {
    // Пересчёт цены перед отправкой
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);
    const materialCost = parseFloat(document.getElementById('material').value);
    const densityCost = parseFloat(document.getElementById('density').value);

    if (isNaN(width) || isNaN(height)) {
        alert("Пожалуйста, введите правильные размеры!");
        return;
    }

    // Переводим размеры из см в м
    const widthInMeters = width * 0.01;
    const heightInMeters = height * 0.01;

    const area = widthInMeters * heightInMeters;
    let basePrice = area * materialCost;
    basePrice += densityCost;

    const minPrice = Math.round(basePrice);
    const maxPrice = Math.round(basePrice + (basePrice * 0.1));
    const resultPrice = `От ${minPrice} до ${maxPrice} драм.`;

    // Проверка обязательных полей
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    if (!name || !phone) {
        alert("Пожалуйста, заполните все поля!");
        return;
    }

    // Получаем текущую дату и время в GMT+4
    const currentDate = new Date();
    const options = {
        timeZone: 'Asia/Yerevan',  // GMT+4
        hour12: false,             // 24-часовой формат
        hour: '2-digit',           // Часы
        minute: '2-digit',         // Минуты
        year: 'numeric',           // Год
        month: '2-digit',          // Месяц
        day: '2-digit'             // День
    };

    const dateFormatter = new Intl.DateTimeFormat('ru-RU', options);
    const dateString = dateFormatter.format(currentDate);

    // Формируем сообщение
    const message = `
    Новый заказ:
    \n Печать Меню
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
