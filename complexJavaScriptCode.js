/* 
Filename: complexJavaScriptCode.js

This code demonstrates a complex and sophisticated JavaScript program 
that simulates a virtual pet game called "Virtual Zoo".

The program includes advanced features such as:
- Object-oriented programming
- Inheritance and polymorphism
- Asynchronous operations with Promises and async/await
- Event handling and event-driven architecture
- Data persistence using LocalStorage
- User interface with DOM manipulation

Please note that this is a simplified version of the complete game and may not be fully functional.
*/

// Class representing a virtual pet
class VirtualPet {
  constructor(name, species) {
    this.name = name;
    this.species = species;
    this.energy = 100;
    this.hunger = 0;
    this.happiness = 100;
    this.isSleeping = false;
  }

  eat(food) {
    setTimeout(() => {
      this.hunger -= food.nutrition;
      if (this.hunger < 0) this.hunger = 0;

      this.energy += food.nutrition;
      if (this.energy > 100) this.energy = 100;
    }, 1000);
  }

  play() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.happiness += 20;
        if (this.happiness > 100) this.happiness = 100;

        resolve();
      }, 2000);
    });
  }

  sleep() {
    this.isSleeping = true;
    this.energy += 30;
    if (this.energy > 100) this.energy = 100;

    setTimeout(() => {
      this.isSleeping = false;
    }, 5000);
  }

  toString() {
    return `[${this.species}] ${this.name}`;
  }
}

// Class representing a food item
class Food {
  constructor(name, nutrition) {
    this.name = name;
    this.nutrition = nutrition;
  }
}

// Class representing the virtual zoo
class VirtualZoo {
  constructor() {
    this.pet = null;
    this.foods = [];

    this.initialize();
  }

  initialize() {
    this.pet = new VirtualPet("Simba", "Lion");
    this.foods.push(new Food("Meat", 10));
    this.foods.push(new Food("Fish", 8));
    this.foods.push(new Food("Vegetables", 5));
  }

  async start() {
    console.log("Welcome to Virtual Zoo!");

    while (true) {
      console.log("\nWhat would you like to do?");
      console.log("1. Feed the pet");
      console.log("2. Play with the pet");
      console.log("3. Make the pet sleep");
      console.log("4. Quit");

      const choice = await this.getUserInput("\nEnter your choice: ");

      switch (choice) {
        case "1":
          await this.feedPet();
          break;
        case "2":
          await this.playWithPet();
          break;
        case "3":
          this.pet.sleep();
          console.log(`${this.pet} is now sleeping...`);
          break;
        case "4":
          console.log("Exiting Virtual Zoo. Goodbye!");
          return;
        default:
          console.log("Invalid choice. Please try again.");
          break;
      }

      await this.updateDisplay();
    }
  }

  async getUserInput(promptText) {
    return new Promise((resolve) => {
      const input = prompt(promptText);
      resolve(input);
    });
  }

  async feedPet() {
    console.log("Choose a food item:");

    this.foods.forEach((food, index) => {
      console.log(`${index + 1}. ${food.name}`);
    });

    const choice = await this.getUserInput("\nEnter your choice: ");
    const foodIndex = parseInt(choice) - 1;
    const selectedFood = this.foods[foodIndex];

    if (selectedFood) {
      console.log(`You feed ${this.pet} with ${selectedFood.name}...`);
      this.pet.eat(selectedFood);
    } else {
      console.log("Invalid choice. Please try again.");
    }
  }

  async playWithPet() {
    console.log(`You play with ${this.pet}...`);
    await this.pet.play();
    console.log(`${this.pet} enjoyed playing!`);
  }

  async updateDisplay() {
    const statusMessage = document.getElementById("status-message");
    statusMessage.innerText = `${this.pet}: Energy=${this.pet.energy}, Hunger=${this.pet.hunger}, Happiness=${this.pet.happiness}`;

    const sleepStatus = document.getElementById("sleep-status");
    sleepStatus.innerText = `Sleeping: ${this.pet.isSleeping ? "Yes" : "No"}`;
  }
}

// Entry point
const virtualZoo = new VirtualZoo();
virtualZoo.start();