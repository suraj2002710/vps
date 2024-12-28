function compareTexts() {
    const referenceText = document.getElementById("reference-text").innerText.trim();
    const userText = document.getElementById("user-text").value.trim();

    // Split both texts into arrays of words
    const referenceWords = referenceText.split(/\s+/);
    let userWords = userText.split(/\s+/);

    const result = [];
    let refIndex = 0;
    let userIndex = 0;

    // Iterate through the reference text and compare with user input
    while (refIndex < referenceWords.length && userIndex < userWords.length) {
        const refWord = referenceWords[refIndex];
        const userWord = userWords[userIndex];
        
        // Skip any user words that are not found in the reference text
        if (!referenceWords.includes(userWord)) {
            userIndex++;
            continue;
        }

        if (refWord === userWord) {
            // Correct match
            result.push(`<span class="correct">${refWord}</span>`);
            refIndex++;
            userIndex++;
        } else if (getLevenshteinDistance(refWord, userWord) <= 2) {
            // Spelling error
            result.push(`<span class="spelling-error">${userWord}</span>`);
            refIndex++;
            userIndex++;
        } else if (refWord !== userWord) {
            // Missing word from user input
            result.push(`<span class="missing">${refWord}</span>`);
            refIndex++;
        }
    }

    // If reference text has remaining words, mark them as missing
    while (refIndex < referenceWords.length) {
        const refWord = referenceWords[refIndex];
        result.push(`<span class="missing">${refWord}</span>`);
        refIndex++;
    }

    // Display the comparison result
    document.getElementById("comparison-result").innerHTML = result.join(" ");
}

// Function to calculate Levenshtein distance (string similarity)
function getLevenshteinDistance(a, b) {
    const matrix = [];

    // Initialize the matrix
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    // Fill the matrix
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // Substitution
                    matrix[i][j - 1] + 1,     // Insertion
                    matrix[i - 1][j] + 1      // Deletion
                );
            }
        }
    }

    return matrix[b.length][a.length];
}