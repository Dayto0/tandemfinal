// Объект переводов
const translations = {
    ru: {
        brandTitle: "ТАН•ДЕМ",
        sendingTitle: "Обратный звонок",
        namePlaceholder: "Введите имя",
        phonePlaceholder: "Введите номер телефона",
    },
    am: {
        brandTitle: "ՏԱՆ•ԴԵՄ",
        sendingTitle: "Հետ Հեռախոսազանգ",
        namePlaceholder: "Մուտքագրեք անունը",
        phonePlaceholder: "Հեռախոսահամարը",
    },
    en: {
        brandTitle: "TAN•DEM",
        sendingTitle: "Back Call",
        namePlaceholder: "Enter name",
        phonePlaceholder: "Enter phone number",
    }
};

// Функция для изменения языка
function changeLanguage(language) {
    // Обновляем текст на странице
    document.getElementById("brandTitle").innerText = translations[language].brandTitle;
    document.getElementById("sendingTitle").innerText = translations[language].sendingTitle;
    document.getElementById("name").placeholder = translations[language].namePlaceholder;
    document.getElementById("phone").placeholder = translations[language].phonePlaceholder;
    document.title = translations[language].sendingTitle;

    // Обновление активного флага
    updateActiveFlag(language);
}

// Устанавливаем язык по умолчанию
changeLanguage('am'); // по умолчанию армянский

// Функция для обновления активного флага
function updateActiveFlag(language) {
    // Скрываем все флаги
    document.getElementById('ru-flag').style.opacity = 0.5;
    document.getElementById('am-flag').style.opacity = 0.5;
    document.getElementById('en-flag').style.opacity = 0.5;

    // Показываем активный флаг
    document.getElementById(`${language}-flag`).style.opacity = 1;
}

// Функция для отправки данных на Telegram
function sendOrder() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    if (!name || !phone) {
        alert("Пожалуйста, заполните все поля!");
        return;
    }

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

    const message = `
    Заказ на обратный звонок:
    \n👤Имя: ${name}
    \n📞Телефон: ${phone}
    \n📅Дата заказа: ${dateString}`;

    const token = 'YOUR_TELEGRAM_BOT_TOKEN';
    const chatId = 'YOUR_CHAT_ID';
    const apiUrl = `https://api.telegram.org/bot${token}/sendMessage`;

    const url = `${apiUrl}?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

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
а
