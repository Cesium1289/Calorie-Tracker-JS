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
    document.getElementById("calories-total").innerText = this._totalCalories;
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
    div.innerText = this._calorieLimit - this._totalCalories;
  }

  _Render() {
    this._DisplayCaloriesConsumed();
    this._DisplayTotalCalories();
    this._DisplayCaloriesRemaining(
      this._DisplayCaloriesConsumed(),
      this._DisplayCaloriesBurned()
    );
    this._DisplayTotalCalories();
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
const meal = new Meal("breakfast", 400);
const workout = new Workout("run", 320);
tracker.AddWorkout(workout);
tracker.AddMeal(meal);
tracker.Display();
tracker._Render();
