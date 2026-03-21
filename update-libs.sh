#!/bin/bash

# Script to update libraries using pnpm and test with npm

# Function to print a section header
print_header() {
  echo "============================================"
  echo "$1"
  echo "============================================"
}

# Define folders to update
folders=(
  "."
)

# Save the root directory
root_dir=$(pwd)

# Loop through each folder
for folder in "${folders[@]}"; do
  print_header "PROCESSING FOLDER: $folder"

  # Navigate to the folder
  cd "$root_dir"
  if [ "$folder" != "." ]; then
    cd "$folder"
  fi

  # Print outdated packages before update
  print_header "OUTDATED PACKAGES BEFORE UPDATE IN $folder"
  npm outdated

  # Update packages
  print_header "UPDATING PACKAGES IN $folder"
  pnpm up --latest

  # Test after update
  print_header "TESTING AFTER UPDATE IN $folder"
  echo "Deleting node_modules..."
  rm -rf node_modules
  rm -f pnpm-lock.yaml
  echo "Installing packages with npm..."
  pnpm i

  # Print outdated packages after update
  print_header "OUTDATED PACKAGES AFTER UPDATE IN $folder"
  npm outdated
done

# Return to root directory
cd "$root_dir"

print_header "UPDATE COMPLETED"
echo "Libraries have been updated and tested in all folders."
