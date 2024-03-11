class CalorieTracker {
  constructor() {
    this._calorieLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
    this._Render();
  }

  AddMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    console.log(meal.calories);
    console.log(this);
    this._Render();
  }

  RemoveMeal(toRemove) {
    this._meals.forEach((meal, x) => {
      if (meal.id === toRemove.id) {
        this._meals.splice(x, 1);
        this._totalCalories -= toRemove.calories;
      }
    });
    this._Render();
  }

  AddWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    console.log(workout.calories);
    console.log(this);
    this._Render();
  }
  Display() {
    console.log("total calories: " + this._totalCalories);
    console.log(this._meals);
    console.log(this._workouts);
  }

  _DisplayCalorieLimit() {
    document.getElementById("calories-limit").innerText = this._calorieLimit;
  }
  _DisplayTotalCalories() {
    const div = document.getElementById("calories-total");
    div.innerText = this._totalCalories;
    if (this._totalCalories > this._calorieLimit) {
      div.parentElement.parentElement.classList.remove("bg-primary");
      div.parentElement.parentElement.classList.add("bg-danger");
    } else {
      div.parentElement.parentElement.classList.remove("bg-danger");
      div.parentElement.parentElement.classList.add("bg-primary");
    }
  }

  _DisplayCaloriesConsumed() {
    const div = document.getElementById("calories-consumed");
    let sum = 0;
    this._meals.forEach((meal) => {
      sum += meal.calories;
    });
    div.innerText = sum;
    return sum;
  }

  _DisplayCaloriesBurned() {
    const div = document.getElementById("calories-burned");
    let sum = 0;
    this._workouts.forEach((workout) => {
      sum += workout.calories;
    });

    div.innerText = sum;
    return sum;
  }

  _DisplayCaloriesRemaining(consumed, burned) {
    const div = document.getElementById("calories-remaining");
    const progBar = document.querySelector("#calorie-progress");
    const remaining = this._calorieLimit - this._totalCalories;
    div.innerText = remaining;
    if (remaining <= 0) {
      div.parentElement.parentElement.classList.remove("bg-light");
      div.parentElement.parentElement.classList.add("bg-danger");
      progBar.classList.remove("bg-success");
      progBar.classList.add("bg-danger");
    } else {
      progBar.classList.remove("bg-danger");
      progBar.classList.add("bg-green");
      div.parentElement.parentElement.classList.remove("bg-danger");
      div.parentElement.parentElement.classList.add("bg-light");
    }
  }

  _DisplyCaloriesProgress() {
    const progBar = document.querySelector("#calorie-progress");
    const percetage = (this._totalCalories / this._calorieLimit) * 100;
    const width = Math.min(percetage, 100);
    progBar.style.width = `${width}%`;
  }

  _Render() {
    this._DisplayCaloriesConsumed();
    this._DisplayTotalCalories();
    this._DisplayCaloriesRemaining(
      this._DisplayCaloriesConsumed(),
      this._DisplayCaloriesBurned()
    );
    this._DisplayTotalCalories();
    this._DisplyCaloriesProgress();
  }
}

class Meal {
  constructor(name, calories) {
    this._name = name;
    this._calories = calories;
    this._id = Math.random().toString(16).slice(2);
    console.log(this);
  }

  get calories() {
    return this._calories;
  }
}

class Workout {
  constructor(name, calories) {
    this._name = name;
    this._calories = calories;
    this._id = Math.random().toString(16).slice(2);
  }
  get name() {
    return this._name;
  }
  get calories() {
    return this._calories;
  }
}

class App {
  constructor() {
    this._tracker = new CalorieTracker();
    document
      .getElementById("meal-form")
      .addEventListener("submit", this._NewItem.bind(this, "meal"));
    document
      .getElementById("workout-form")
      .addEventListener("submit", this._NewItem.bind(this, "workout"));
  }
  _NewMeal(e) {
    console.log("here");
    e.preventDefault();
    const name = document.getElementById("meal-name");
    const calories = document.getElementById("meal-calories");

    if (name.value === "" || calories.value === "") {
      alert("Enter all meal fields");
      return;
    }

    const meal = new Meal(name.value, parseInt(calories.value));
    this._tracker.AddMeal(meal);
    name.value = "";
    calories.value = "";

    //close popdown menu after adding a new meal
    const collapseMeal = document.querySelector("#collapse-meal");
    const bsCollapse = new bootstrap.Collapse(collapseMeal, { toggle: true });
  }

  _NewItem(type, e) {
    e.preventDefault();
    const name = document.getElementById(`${type}-name`);
    const calories = document.getElementById(`${type}-calories`);

    if (name.value === "" || calories.value === "") {
      alert("Enter all meal fields");
      return;
    }
    if (type === "workout") {
      const workout = new Workout(name.value, parseInt(calories.value));
      this._tracker.AddWorkout(workout);
    } else {
      const meal = new Meal(name.value, parseInt(calories.value));
      this._tracker.AddMeal(meal);
    }
    name.value = "";
    calories.value = "";

    //close popdown menu after adding a new workout
    const collapseWorkout = document.querySelector(`#collapse-${type}`);
    const bsCollapse = new bootstrap.Collapse(collapseWorkout, {
      toggle: true,
    });
  }
}

const app = new App();
