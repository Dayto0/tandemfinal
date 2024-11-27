let currentLanguage = 'am'; // Начальный язык

// Переключение языка при клике на флаг
function changeLanguage(language) {
    currentLanguage = language;
    updateText(); // Обновление текста на странице в зависимости от выбранного языка
    closeDropdown(); // Закрытие выпадающего меню
    updateFlag(language); // Обновление флага
}

// Обновление текста на странице в зависимости от текущего языка
function updateText() {
    const translations = {
        'ru': {
            'brandTitle': 'Тандем',
            'companyAddress': 'Адрес: Vagarshapat Kamo 10',
            'companyPhone': 'Телефон: +37444932510',
            'bigPrint': 'Большая печать',
            'menuPrint': 'Печать меню',
            'businessCardPrint': 'Печать визиток',
            'backCall': 'Обратный звонок'  // Перевод для кнопки
        },
        'en': {
            'brandTitle': 'Tandem',
            'companyAddress': 'Address: Vagarshapat Kamo 10',
            'companyPhone': 'Phone: +37444932510',
            'bigPrint': 'Big Print',
            'menuPrint': 'Menu Printing',
            'businessCardPrint': 'Business Card Printing',
            'backCall': 'Back Call'  // Перевод для кнопки
        },
        'am': {
            'brandTitle': 'Տանդեմ',
            'companyAddress': 'Հասցե: Vagarshapat Kamo 10',
            'companyPhone': 'Հեռախոս: +37444932510',
            'bigPrint': 'Մեծ Տպագրություն',
            'menuPrint': 'Մենյուի Տպագրություն',
            'businessCardPrint': 'Այցեքարտերի տպագրություն',
            'backCall': 'Հետադարձ հեռախոսազանգ'  // Перевод для кнопки
        }
    };

    // Применение перевода для всех элементов
    document.getElementById('brandTitle').textContent = translations[currentLanguage].brandTitle;
    document.getElementById('companyAddress').textContent = translations[currentLanguage].companyAddress;
    document.getElementById('companyPhone').textContent = translations[currentLanguage].companyPhone;
    document.querySelector('.menu .menu-item:nth-child(1) p').textContent = translations[currentLanguage].bigPrint;
    document.querySelector('.menu .menu-item:nth-child(2) p').textContent = translations[currentLanguage].menuPrint;
    document.querySelector('.menu .menu-item:nth-child(3) p').textContent = translations[currentLanguage].businessCardPrint;

    // Обновляем текст кнопки "Обратный звонок"
    const backCallButton = document.getElementById('backCall');
    if (backCallButton) {
        backCallButton.textContent = translations[currentLanguage].backCall;
    }
}

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
