export function formatName(fullName: string): string {
  const nameParts = fullName.split(" ");

  // Extract the first name
  let formattedName = nameParts[0];

  // Abbreviate the second name to only the first letter (uppercase)
  if (nameParts.length > 1) {
    formattedName += " " + nameParts[1][0].toUpperCase() + ".";
  }

  return formattedName;
}
