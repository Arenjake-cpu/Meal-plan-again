const users = {};
let currentUser = null;
const weeklyMeals = {}; // Stores per-user weekly meal plan

document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    if (users[username]) {
        alert('User already exists!');
    } else {
        users[username] = password;
        weeklyMeals[username] = {};
        alert('Sign up successful! You can now log in.');
        this.reset();
    }
});

document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (users[username] && users[username] === password) {
        currentUser = username;
        if (!weeklyMeals[currentUser]) weeklyMeals[currentUser] = {};
        alert('Login successful!');
        showMealPlan();
    } else {
        alert('Invalid username or password!');
    }
});

document.getElementById('show-login').addEventListener('click', function () {
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
});

document.getElementById('show-signup').addEventListener('click', function () {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('signup-form').classList.remove('hidden');
});

document.getElementById('logout').addEventListener('click', function () {
    currentUser = null;
    document.getElementById('meal-plan').classList.add('hidden');
    document.getElementById('form-container').classList.remove('hidden');
    document.getElementById('meal-list').innerHTML = '';
});

document.getElementById('save-meal').addEventListener('click', function () {
    const day = document.getElementById('day').value;
    const breakfast = document.getElementById('breakfast').value;
    const lunch = document.getElementById('lunch').value;
    const dinner = document.getElementById('dinner').value;

    weeklyMeals[currentUser][day] = { breakfast, lunch, dinner };
    displayMeals();
});

function displayMeals() {
    const mealList = document.getElementById('meal-list');
    mealList.innerHTML = '';
    const userMeals = weeklyMeals[currentUser] || {};
    const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

    days.forEach(day => {
        if (userMeals[day]) {
            mealList.innerHTML += `<li><strong>${day}:</strong> Breakfast: ${userMeals[day].breakfast}, Lunch: ${userMeals[day].lunch}, Dinner: ${userMeals[day].dinner}</li>`;
        }
    });
}

function showMealPlan() {
    document.getElementById('form-container').classList.add('hidden');
    document.getElementById('meal-plan').classList.remove('hidden');
    displayMeals();
}
