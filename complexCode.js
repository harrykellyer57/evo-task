/**
 * File: complexCode.js
 * Description: This code implements a complex and sophisticated algorithm for generating prime numbers.
 * It utilizes various advanced techniques such as the Sieve of Eratosthenes and the Sieve of Atkin.
 * Author: AI Assistant
 * Date: 2021-09-30
 */

// Function to generate all prime numbers up to a given limit using the Sieve of Eratosthenes algorithm
function sieveOfEratosthenes(limit) {
  // Create an array of boolean values, initially all set to true
  let sieve = [];
  for (let i = 0; i <= limit; i++) {
    sieve.push(true);
  }
  
  // Mark the multiples of each prime number as false
  for (let p = 2; p * p <= limit; p++) {
    if (sieve[p] === true) {
      for (let i = p * p; i <= limit; i += p) {
        sieve[i] = false;
      }
    }
  }
  
  // Generate the list of prime numbers
  let primes = [];
  for (let p = 2; p <= limit; p++) {
    if (sieve[p] === true) {
      primes.push(p);
    }
  }
  
  return primes;
}

// Function to generate all prime numbers up to a given limit using the Sieve of Atkin algorithm
function sieveOfAtkin(limit) {
  // Create an array of boolean values, initialized to false
  let sieve = new Array(limit + 1);
  for (let i = 0; i <= limit; i++) {
    sieve[i] = false;
  }
  
  // Part 1: Sieve for values of x and y
  let sqrtLimit = Math.sqrt(limit);
  for (let x = 1; x <= sqrtLimit; x++) {
    for (let y = 1; y <= sqrtLimit; y++) {
      let n = (4 * x * x) + (y * y);
      if (n <= limit && (n % 12 === 1 || n % 12 === 5)) {
        sieve[n] = !sieve[n];
      }
  
      n = (3 * x * x) + (y * y);
      if (n <= limit && n % 12 === 7) {
        sieve[n] = !sieve[n];
      }
  
      n = (3 * x * x) - (y * y);
      if (x > y && n <= limit && n % 12 === 11) {
        sieve[n] = !sieve[n];
      }
    }
  }
  
  // Part 2: Mark all multiples of values square rooted
  for (let r = 5; r <= sqrtLimit; r++) {
    if (sieve[r] === true) {
      for (let i = r * r; i <= limit; i += r * r) {
        sieve[i] = false;
      }
    }
  }
  
  // Generate the list of prime numbers
  let primes = [];
  for (let i = 2; i <= limit; i++) {
    if (sieve[i] === true) {
      primes.push(i);
    }
  }
  
  return primes;
}

// Generate prime numbers up to a limit using both algorithms and compare the results
function generatePrimes(limit) {
  let eratosthenesPrimes = sieveOfEratosthenes(limit);
  let atkinPrimes = sieveOfAtkin(limit);
  
  console.log("Primes using Sieve of Eratosthenes:");
  console.log(eratosthenesPrimes);
  
  console.log("Primes using Sieve of Atkin:");
  console.log(atkinPrimes);
  
  console.log("Both algorithms generated the same primes:", compareArrays(eratosthenesPrimes, atkinPrimes));
}

// Function to compare two arrays for equality
function compareArrays(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  
  return true;
}

// Call the main function
generatePrimes(1000);

// The code above generates prime numbers up to the limit of 1000 using both the Sieve
// of Eratosthenes and Sieve of Atkin algorithms. It then compares the results to check
// if both algorithms generated the same prime numbers. The code includes comments to
// explain the purpose and functionality of each section.
// Feel free to explore and modify the code as needed.