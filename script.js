"use strict";
// ========== ДАННЫЕ О КОТАХ (типизированный массив) ==========
const catsData = [
    {
        name: "🐅 Рыжик",
        description: "Энергичный рыжий кот, обожает играть с бантиками и спать на ноутбуке.",
        tag: "🌞 Солнечный",
        emoji: "🐅"
    },
    {
        name: "🖤 Багира",
        description: "Таинственная чёрная кошка с зелёными глазами. Любит высоту и уют.",
        tag: "🌙 Мистическая",
        emoji: "🐈⬛"
    },
    {
        name: "🤍 Снежок",
        description: "Белый пушистик, который мурлычет как трактор. Обожает лакомиться сметаной.",
        tag: "❄️ Снежный",
        emoji: "🐱"
    },
    {
        name: "🧡 Мармелад",
        description: "Трёхцветная кошка с характером принцессы. Требует внимания 24/7.",
        tag: "🍊 Цитрусовая",
        emoji: "😺"
    }
];
// ========== СОВЕТЫ ДЛЯ ЭМОДЗИ ==========
const adviceList = [
    "😌 Погладь кота — и стресс уйдёт!",
    "🍣 Угости рыбой, и дружба станет крепче.",
    "📦 Кот оценит новую коробку больше, чем игрушку.",
    "🕰️ Не мешай коту спать — это святое.",
    "💤 Если кот пришёл и лёг на тебя — ты избран!",
    "🎣 Играй с котом хотя бы 15 минут в день."
];
// ========== КЛАСС ДЛЯ УПРАВЛЕНИЯ КОТАМИ ==========
class CatManager {
    constructor(cats) {
        this.cats = cats;
        this.gridElement = document.getElementById('catsGrid');
        this.randomMessageElement = document.getElementById('randomMessage');
    }
    // Рендер всех карточек
    renderCats() {
        if (!this.gridElement) {
            console.error('Элемент catsGrid не найден');
            return;
        }
        this.gridElement.innerHTML = '';
        this.cats.forEach((cat) => {
            const card = this.createCatCard(cat);
            this.gridElement.appendChild(card);
        });
    }
    // Создание карточки кота
    createCatCard(cat) {
        const card = document.createElement('div');
        card.className = 'cat-card';
        card.innerHTML = `
            <div class="cat-img" style="font-size: 5rem; background: #fae6c3;">${cat.emoji}</div>
            <div class="cat-info">
                <div class="cat-name">${cat.name}</div>
                <div class="cat-desc">${cat.description}</div>
                <span class="cat-tag">${cat.tag}</span>
            </div>
        `;
        card.addEventListener('click', () => {
            this.onCatClick(cat);
        });
        return card;
    }
    // Обработчик клика по карточке
    onCatClick(cat) {
        alert(`🐾 ${cat.name} говорит: "Мяу! Погладь меня!" 🐾`);
    }
    // Получение случайного кота
    getRandomCat() {
        const randomIndex = Math.floor(Math.random() * this.cats.length);
        const cat = this.cats[randomIndex];
        if (this.randomMessageElement) {
            this.randomMessageElement.innerHTML = `🎉 Вам выпал: <strong>${cat.name}</strong> — ${cat.description} ${cat.emoji}`;
        }
    }
}
// ========== КЛАСС ДЛЯ УПРАВЛЕНИЯ ЭМОДЗИ ==========
class EmojiManager {
    constructor(adviceList) {
        this.adviceList = adviceList;
        this.adviceElement = document.getElementById('emojiAdvice');
        this.initEmojiListeners();
    }
    // Инициализация слушателей для эмодзи
    initEmojiListeners() {
        const emojiSpans = document.querySelectorAll('.emoji-gallery span');
        emojiSpans.forEach((emoji) => {
            emoji.addEventListener('click', () => {
                this.showRandomAdvice(emoji.textContent || '🐱');
            });
        });
    }
    // Показать случайный совет
    showRandomAdvice(emoji) {
        const randomAdvice = this.adviceList[Math.floor(Math.random() * this.adviceList.length)];
        if (this.adviceElement) {
            this.adviceElement.innerHTML = `${emoji} ${randomAdvice}`;
        }
    }
}
// ========== ГЛАВНЫЙ КЛАСС ПРИЛОЖЕНИЯ ==========
class CatApp {
    constructor() {
        this.catManager = new CatManager(catsData);
        this.emojiManager = new EmojiManager(adviceList);
        this.randomButton = document.getElementById('randomCatBtn');
        this.init();
    }
    init() {
        // Рендерим котов
        this.catManager.renderCats();
        // Добавляем слушатель на кнопку
        if (this.randomButton) {
            this.randomButton.addEventListener('click', () => {
                this.catManager.getRandomCat();
            });
        }
        // Приветствие в консоли
        console.log('🐱 TypeScript приложение запущено! Мяу!');
        console.log(`📊 Загружено котов: ${catsData.length}`);
    }
}
// ========== ЗАПУСК ПРИЛОЖЕНИЯ ПОСЛЕ ЗАГРУЗКИ DOM ==========
document.addEventListener('DOMContentLoaded', () => {
    new CatApp();
});
