const translations = {
    ru: {
        brandTitle: "ТАН•ДЕМ",
        sendingTitle: "Обратный звонок", // Изменено на "Калькулятор цен меню"
        namePlaceholder: "Введите имя",
        phonePlaceholder: "Введите номер телефона",
    },
    am: {
        brandTitle: "ՏԱՆ•ԴԵՄ",
        sendingTitle: "Հետ Հեռախոսազանգ", // Перевод на армянский
        namePlaceholder: "Մուտքագրեք անունը",
        phonePlaceholder: "Հետադարձ հեռախոսազանգ",
    },
    en: {
        brandTitle: "TAN•DEM",
        sendingTitle: "Back Call", // Перевод на английский
        result: "Price: ",
        namePlaceholder: "Enter name",
        phonePlaceholder: "Enter phone number",
    }
};

// Функция для изменения языка
function changeLanguage(language) {
    document.getElementById("brandTitle").innerText = translations[language].brandTitle; // Обновление текста заголовка бренда
    document.getElementById("sendingTitle").innerText = translations[language].sendingTitle; // Обновление заголовка "Калькулятор цен меню"
    document.getElementById("result").innerText = translations[language].result;
    document.title = translations[language].sendingTitle;

    // Переводим placeholder для всех полей
    document.getElementById("name").placeholder = translations[language].namePlaceholder;
    document.getElementById("phone").placeholder = translations[language].phonePlaceholder;
}

// Устанавливаем язык по умолчанию
changeLanguage('am'); // по умолчанию армянский


// Функция для отправки данных на Telegram
function sendOrder() {
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
    Заказ на обратный звонок:
    \n👤Имя: ${name}
    \n📞Телефон: ${phone}
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
