class CalorieTracker{
    constructor(){
        this._calorieLimit = 2000;
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];
    }

    AddMeal(meal){
        this._meals.push(meal);
        this._totalCalories += meal.caloires;
    }

    RemoveMeal(toRemove)
    {
        this._meals.forEach((meal,x)=>{
            if(meal.id === toRemove.id){
                this._meals.splice(x,1);
                this._totalCalories -= toRemove.caloires;
            }
        });
    }

    AddWorkout(workout){
        this._workouts.push(workout);
    }
    Display()
    {
        console.log("total calories: " + this._totalCalories );
        console.log(this._meals);
    console.log(this._workouts)
    }
}

class Meal{

    constructor(name,calories){
        this._name = name;
        this._calories = calories;
        this._id = Math.random().toString(16).slice(2);
    }

    get caloires(){
        return this._calories;
    }
}

class Workout{
    constructor(name, calories)
    {
        this._name = name;
        this._calories = calories;
        this._id = Math.random().toString(16).slice(2);
    }
    get name(){
        return this._name;
    
    }
    get calories(){
        return this._calories;
    }
}


const tracker = new CalorieTracker();
const meal = new Meal("breakfast",400);
const workout = new Workout("run",200);
tracker.AddWorkout(workout);
tracker.AddMeal(meal);
tracker.Display();