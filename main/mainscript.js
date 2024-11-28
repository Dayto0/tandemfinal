// Объект переводов
const translations = {
    ru: {
        brandTitle: "ТАН•ДЕМ",
        companyAddress: "Адрес: Vagarshapat Kamo 10",
        companyPhone: "Телефон: +37444932510",
        bigPrint: "Большая печать",
        menuPrint: "Печать меню",
        businessCardPrint: "Печать визиток",
        backCall: "Обратный звонок"
    },
    am: {
        brandTitle: "ՏԱՆ•ԴԵՄ",
        companyAddress: "Հասցե: Vagarshapat Kamo 10",
        companyPhone: "Հեռախոս: +37444932510",
        bigPrint: "Մեծ Տպագրություն",
        menuPrint: "Մենյուի Տպագրություն",
        businessCardPrint: "Այցեքարտերի տպագրություն",
        backCall: "Հետադարձ հեռախոսազանգ"
    },
    en: {
        brandTitle: "TAN•DEM",
        companyAddress: "Address: Vagarshapat Kamo 10",
        companyPhone: "Phone: +37444932510",
        bigPrint: "Big Print",
        menuPrint: "Menu Printing",
        businessCardPrint: "Business Card Printing",
        backCall: "Back Call"
    }
};

// Текущий язык
let currentLanguage = 'am'; // Язык по умолчанию

// Функция смены языка
function changeLanguage(language) {
    currentLanguage = language;
    document.getElementById("brandTitle").innerText = translations[language].brandTitle;
    document.getElementById("companyAddress").innerText = translations[language].companyAddress;
    document.getElementById("companyPhone").innerText = translations[language].companyPhone;
    document.querySelector(".menu .menu-item:nth-child(1) p").innerText = translations[language].bigPrint;
    document.querySelector(".menu .menu-item:nth-child(2) p").innerText = translations[language].menuPrint;
    document.querySelector(".menu .menu-item:nth-child(3) p").innerText = translations[language].businessCardPrint;

    // Обновляем текст кнопки "Обратный звонок"
    const backCallButton = document.getElementById("backCall");
    if (backCallButton) {
        backCallButton.innerText = translations[language].backCall;
    }

    // Обновляем флаг
    updateFlag(language);
}

// Функция обновления флага
function updateFlag(language) {
    const flagMap = {
        ru: "https://cdn-icons-png.flaticon.com/512/323/323300.png",
        en: "https://cdn-icons-png.flaticon.com/512/323/323310.png",
        am: "https://cdn-icons-png.flaticon.com/512/197/197516.png"
    };
    document.getElementById("language-button").querySelector(".flag").src = flagMap[language];
}

// Сразу устанавливаем язык до отображения содержимого
changeLanguage(currentLanguage);

// Обновление флага
function updateFlag(language) {
    const flagMap = {
        'ru': 'https://cdn-icons-png.flaticon.com/512/323/323300.png',
        'en': 'https://cdn-icons-png.flaticon.com/512/323/323310.png',
        'am': 'https://cdn-icons-png.flaticon.com/512/197/197516.png'
    };
    document.getElementById('language-button').querySelector('.flag').src = flagMap[language];
}

// Открытие выпадающего меню
function toggleDropdown() {
    const dropdown = document.getElementById('language-dropdown');
    dropdown.classList.toggle('show');
}

// Закрытие выпадающего меню
function closeDropdown() {
    const dropdown = document.getElementById('language-dropdown');
    dropdown.classList.remove('show');
}

// Закрытие меню, если пользователь кликнул вне меню
window.onclick = function(event) {
    const dropdown = document.getElementById('language-dropdown');
    const button = document.getElementById('language-button');

    if (!button.contains(event.target) && !dropdown.contains(event.target)) {
        closeDropdown();
    }
}
