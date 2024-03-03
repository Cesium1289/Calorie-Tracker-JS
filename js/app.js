class CalorieTracker {
  constructor() {
    this._calorieLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
    this._DisplayCalorieLimit();
    this._DisplayTotalCalories();
    this._DisplayCaloriesConsumed();
    this._DisplayCaloriesBurned();
    this._DisplyCaloriesProgress();
  }

  AddMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    console.log(meal.calories);
  }

  RemoveMeal(toRemove) {
    this._meals.forEach((meal, x) => {
      if (meal.id === toRemove.id) {
        this._meals.splice(x, 1);
        this._totalCalories -= toRemove.calories;
      }
    });
  }

  AddWorkout(workout) {
    this._workouts.push(workout);

    this._totalCalories -= workout.calories;
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

const tracker = new CalorieTracker();
const meal = new Meal("breakfast", 500);
const workout = new Workout("run", 320);
tracker.AddWorkout(workout);
tracker.AddMeal(meal);
tracker.Display();
tracker._Render();
