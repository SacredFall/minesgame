import os
import time

# File to be written to
FILE_NAME = "/home/fall/zed-workspace/minesgame/temp.html"

# Ensure the directory exists
os.makedirs(os.path.dirname(FILE_NAME), exist_ok=True)

# Content to write
CONTENT = """// Generate a random number between 0 (inclusive) and 1 (exclusive)
let randomNumber = Math.random();

// Generate a random integer between min (inclusive) and max (inclusive)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a random element from an array
let fruits = ["apple", "banana", "orange", "grape"];
let randomFruit = fruits[Math.floor(Math.random() * fruits.length)];

// Generate a random hex color code
function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Display the results in the console
console.log("Random Number:", randomNumber);
console.log("Random Integer (1-10):", getRandomInt(1, 10));
console.log("Random Fruit:", randomFruit);
console.log("Random Color:", getRandomColor());"""

# Typing settings
DELAY = 0.2  # Delay in seconds between each character
ITERATIONS = 10000  # Number of times to repeat the content

def simulate_typing_in_file():
    for iteration in range(ITERATIONS):
        print(f"--- Typing Iteration {iteration + 1} ---")

        # Open the file in write mode for each iteration
        with open(FILE_NAME, "w") as file:
            for i, char in enumerate(CONTENT):
                file.write(char)
                file.flush()  # Flush to ensure real-time updates
                time.sleep(DELAY)  # Simulate typing delay

            file.write("\n")  # Ensure proper file structure
            file.flush()  # Final flush

        print(f"Iteration {iteration + 1} complete.")

if __name__ == "__main__":
    print(f"Typing simulation started. Writing to: {FILE_NAME}")
    simulate_typing_in_file()
    print("Typing simulation complete.")
