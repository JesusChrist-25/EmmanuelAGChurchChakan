/* document.addEventListener("contextmenu", function(event) {
    event.preventDefault();
});
            document.addEventListener("keydown", function(event) {
    if (event.key === "F12" || 
        (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J" || event.key === "C"))) {
        event.preventDefault();
    }
});  */

            let currentIndex = 0;
            let songs = [];
            let touchStartX = 0;
            let touchEndX = 0;

            // Mapping song files to different languages
const songFiles = {
    Hindi: "https://JesusChrist-25.github.io/EmmanuelAGChurchChakan/hindi.json",
    Marathi: "https://JesusChrist-25.github.io/EmmanuelAGChurchChakan/marathi.json",
    Punjabi: "https://JesusChrist-25.github.io/EmmanuelAGChurchChakan/punjabi.json",
    English: "https://JesusChrist-25.github.io/EmmanuelAGChurchChakan/english.json"
};

// Function to load songs dynamically based on dropdown selection
function loadSongs() {
  const selectedLanguage = document.getElementById("language").value;
  const filePath = songFiles[selectedLanguage];

            // Fetch songs from JSON
            fetch(filePath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error loading file: ${filePath}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.songs) {
                        songs = data.songs;
                        displayCarousel();
                        displayIndex();
                        currentIndex = 0; // Set default to first song
                        updateSlide(); // Ensure highlighting works
                        const firstSong = songs[0];
                        if (firstSong && firstSong.title) {
                          loadAudioOnly(firstSong.title);
                        }

                    } else {
                        console.error("Invalid JSON structure: Missing 'songs' key");
                    }
                })
                .catch((error) => console.error("Error loading songs:", error));
}

// Attach event listener to dropdown for dynamic updates
document.getElementById("language").addEventListener("change", () => {
  const selectedLanguage = document.getElementById("language").value;
  localStorage.setItem("selectedLanguage", selectedLanguage); // Save to browser
  loadSongs(); // Load new songs
});

// Load default songs when the page loads  -- remeber last selection
window.addEventListener("DOMContentLoaded", () => {
  const savedLanguage = localStorage.getItem("selectedLanguage") || "Hindi";
  document.getElementById("language").value = savedLanguage;
  loadSongs();
});
searchBox.addEventListener("focus", function () {
  if (searchBox.value.trim() !== "") { // Ensure there's text to search
    searchSongs(); // Run search immediately on focus
  }
});



            // Display songs in carousel
            function displayCarousel() {
               const songCarousel = document.getElementById("songCarousel");
               songCarousel.innerHTML = songs
              .map(
                  (song) => `
                    <div class="song">
                        <h2 class="lyricsTitle">${song.id}. ${song.title}</h2> <!-- Uses ID from JSON -->
                        <pre>${song.lyrics.join("\n")}</pre>
                    </div>
    `             )
              .join("");
            }

function loadAudioOnly(title) {
  const selectedLanguage = document.getElementById("language").value;
  const audioContainer = document.getElementById("audioPlayer");

  const encodedTitle = encodeURIComponent(title.trim());
  const audioPath = `Audio/${selectedLanguage}/${encodedTitle}.mp3`;

  audioContainer.innerHTML = ""; // Clear previous audio

  // Use GET with no-store to avoid caching and avoid injecting <audio> prematurely
  fetch(audioPath, {
    method: "GET",
    headers: { "Cache-Control": "no-store" }
  })
    .then(response => {
      if (response.ok) {
        // Inject <audio> only if file exists
        audioContainer.innerHTML = `
          <audio controls>
            <source src="${audioPath}" type="audio/mpeg">
            Your browser does not support the audio element.
          </audio>
        `;
      } else {
        // Do NOT inject <audio> if file is missing
        audioContainer.innerHTML = `<p style="color: gray;">Audio not available for this song.</p>`;
      }
    })
    .catch(() => {
      audioContainer.innerHTML = `<p style="color: gray;">Audio could not be loaded.</p>`;
    });
}

    


            // Navigate songs
   function updateSlide() {
    const carousel = document.querySelector(".carousel");
    carousel.style.transition = "transform 0.4s ease-in-out";
    carousel.style.transform = `translateX(-${currentIndex * 100}vw)`;

    // Check which index page should be visible
    const requiredIndexPage = Math.ceil((currentIndex + 1) / INDEX_PAGE_SIZE);
    
    if (requiredIndexPage !== currentIndexPage) {
        displayIndex(requiredIndexPage); // Auto-switch index page
    }

    updateIndexHighlight(); // Ensure highlighting updates
}


            // Enable swipe gestures for mobile
            document.querySelector(".carousel-container").addEventListener("touchstart", (event) => {
                touchStartX = event.touches[0].clientX;
            });

            document.querySelector(".carousel-container").addEventListener("touchend", (event) => {
                if (!touchEndX) {
                    // Prevent multiple event triggers
                    touchEndX = event.changedTouches[0].clientX;
                    handleSwipe();
                    touchEndX = null; // Reset after handling
                }
            });

            function handleSwipe() {
                const swipeThreshold = 60; // Minimum distance for swipe
                const swipeDistance = touchEndX - touchStartX;

                if (Math.abs(swipeDistance) < swipeThreshold) return; // Ignore small swipes

                // Prevent accidental double transition
                let newIndex = currentIndex;
                if (swipeDistance > 0 && currentIndex > 0) {
                    newIndex = currentIndex - 1;
                } else if (swipeDistance < 0 && currentIndex < songs.length - 1) {
                    newIndex = currentIndex + 1;
                }

                // Ensure we update only if there's a valid change
                if (newIndex !== currentIndex) {
                    currentIndex = newIndex;
                    updateSlide();
                }
            }

            function nextSlide() {
                if (currentIndex < songs.length - 1) {
                    currentIndex += 1; // Move only one step forward
                    updateSlide();
                }
            }

            function prevSlide() {
                if (currentIndex > 0) {
                    currentIndex -= 1; // Move only one step backward
                    updateSlide();
                }
            }

            // Function to Display Index
            const INDEX_PAGE_SIZE = 10;
            let currentIndexPage = 1;

           function displayIndex(page = 1) {
    currentIndexPage = page;
    const indexContainer = document.getElementById("indexContainer");
    indexContainer.innerHTML = "";

    const startIndex = (page - 1) * INDEX_PAGE_SIZE;
    const endIndex = Math.min(startIndex + INDEX_PAGE_SIZE, songs.length);

    let indexHTML = "";
    songs.slice(startIndex, endIndex).forEach((song, index) => {
        indexHTML += `<div class="index-item"><a href="javascript:scrollToStory(${song.id})" data-song-id="${song.id}">${song.id}. ${song.title}</a></div>`;
    });

    indexContainer.innerHTML = indexHTML;

    updatePaginationControls();
    updateIndexHighlight(); // Ensure highlighting updates when changing pages
}
function updateIndexHighlight() {
    document.querySelectorAll(".index-item a").forEach((link) => {
        const songID = parseInt(link.getAttribute("data-song-id"), 10);

        if (songID === songs[currentIndex]?.id) {
            link.classList.add("active"); // Add underline highlight
        } else {
            link.classList.remove("active");
        }
    });
}


            function updatePaginationControls() {
                const indexPagination = document.getElementById("indexPagination");
                indexPagination.innerHTML = "";

                const totalIndexPages = Math.ceil(songs.length / INDEX_PAGE_SIZE);
                let paginationHTML = "";

                // Back Button
                if (currentIndexPage > 1) {
                    paginationHTML += `<button onclick="displayIndex(currentIndexPage - 1)">Back</button>`;
                }

                // Numbered Page Buttons (Show 1-5 or Adjust for Current Position)
                const startPage = Math.max(1, currentIndexPage - 2);
                const endPage = Math.min(totalIndexPages, startPage + 4);

                for (let i = startPage; i <= endPage; i++) {
                    paginationHTML += `<button onclick="displayIndex(${i})" ${i === currentIndexPage ? "disabled" : ""}>${i}</button>`;
                }

                // Next Button
                if (currentIndexPage < totalIndexPages) {
                    paginationHTML += `<button onclick="displayIndex(currentIndexPage + 1)">Next</button>`;
                }

                // "Go to Page" Dropdown
                paginationHTML += `<span>Go to Page:</span> <select onchange="displayIndex(parseInt(this.value))">
        ${Array.from({ length: totalIndexPages }, (_, i) => `<option value="${i + 1}" ${i + 1 === currentIndexPage ? "selected" : ""}>${i + 1}</option>`).join("")}
    </select>`;

                indexPagination.innerHTML = paginationHTML;
            }

            // Scroll to selected song
            function scrollToStory(index) {
                currentIndex = songs.findIndex((song) => song.id === index);

                // Reset swipe tracking variables to avoid double movement
                touchStartX = 0;
                touchEndX = 0;

                displayCarousel(); // Ensure lyrics update
                updateSlide(); // Sync navigation correctly

                // Load audio for selected song
                  const selectedSong = songs[currentIndex];
                  if (selectedSong && selectedSong.title) {
                    loadAudioOnly(selectedSong.title);
                  }

            }
            // Add touch tracking for index block scrolling
let indexTouchStartX = 0;
let indexTouchEndX = 0;

// Enable swipe gestures for mobile index block
document.querySelector("#indexContainer").addEventListener("touchstart", (event) => {
    indexTouchStartX = event.touches[0].clientX;
});

document.querySelector("#indexContainer").addEventListener("touchend", (event) => {
    indexTouchEndX = event.changedTouches[0].clientX;
    handleIndexSwipe();
});

function handleIndexSwipe() {
    const swipeThreshold = 50; // Minimum swipe distance
    const swipeDistance = indexTouchEndX - indexTouchStartX;

    if (Math.abs(swipeDistance) < swipeThreshold) return; // Ignore small swipes

    if (swipeDistance < 0 && currentIndexPage < Math.ceil(songs.length / INDEX_PAGE_SIZE)) {
        displayIndex(currentIndexPage + 1); // Swipe left → Next Page
    } else if (swipeDistance > 0 && currentIndexPage > 1) {
        displayIndex(currentIndexPage - 1); // Swipe right → Previous Page
    }
}

// Add smooth scrolling effect for transitions
document.querySelector("#indexContainer").style.transition = "transform 0.4s ease-in-out";

/*
function searchSongs() {
    let input = document.getElementById("searchBox").value.toLowerCase();
    let songs = document.querySelectorAll(".index-item");

    songs.forEach(song => {
        let text = song.textContent.toLowerCase();
        if (text.includes(input)) {
            song.style.display = "block"; // Show matching items
        } else {
            song.style.display = "none"; // Hide non-matching items
        }
    });
} */

function searchSongs() {
    let input = document.getElementById("searchBox").value.toLowerCase().trim();
    let indexContainer = document.getElementById("indexContainer");

    // If search box is empty, restore pagination
    if (input === "") {
        displayIndex(currentIndexPage); // Restore original pagination
        return;
    }

    indexContainer.innerHTML = ""; // Clear current view
    
    const threshold = 2; // max distance allowed
/*    let filteredSongs = songs.filter(song => {
        let songText = `${song.id}. ${song.title}`.toLowerCase();
        let keywords = (song.keywords || []).map(k => k.toLowerCase());

        //return songText.includes(input) || song.id.toString().includes(input) || keywords.some(k => k.includes(input) || levenshtein(k, input) <= threshold || isSubsetMatch(input, k, threshold));
          return songText.includes(input) || song.id.toString().includes(input) || isSubsetFuzzyMatch(inputLower, keywords, threshold);
    }); */
    let filteredSongs = songs.filter(song => {
  let inputLower = input.toLowerCase();
  let keywords = Array.isArray(song.keywords) ? song.keywords.map(k => k.toLowerCase()) : [];

  return (
    song.title.toLowerCase().includes(inputLower) ||
    song.id.toString().includes(inputLower) ||
    isPrefixSubsetMatch(inputLower, keywords)
  );
});

    if (filteredSongs.length === 0) {
        indexContainer.innerHTML = "<p>No matching songs found.</p>";
    } else {
        filteredSongs.forEach(song => {
            let songElement = document.createElement("div");
            songElement.classList.add("index-item");
            songElement.innerHTML = `<a href="javascript:scrollToStory(${song.id})">${song.id}. ${song.title}</a>`;
            indexContainer.appendChild(songElement);
        });
    }
    //for fuzzy search string match
    function levenshtein(a, b) {
  const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      const cost = a[j - 1] === b[i - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[b.length][a.length];
}
    function isSubsetFuzzyMatch(input, keywordArray, threshold = 2) {
  if (!Array.isArray(keywordArray)) return false;

  const inputWords = input.toLowerCase().split(/\s+/);
  const keywords = keywordArray.map(k => k.toLowerCase());

  return inputWords.every(iWord =>
    keywords.some(kWord =>
      kWord === iWord || levenshtein(iWord, kWord) <= threshold
    )
  );
}
    function isExactSubsetMatch(input, keywordArray) {
  if (!Array.isArray(keywordArray)) return false;

  const inputWords = input.toLowerCase().split(/\s+/);
  const keywords = keywordArray.map(k => k.toLowerCase());

  return inputWords.every(iWord => keywords.includes(iWord));
}
    function isPrefixSubsetMatch(input, keywordArray) {
  if (!Array.isArray(keywordArray)) return false;

  const inputWords = input.toLowerCase().split(/\s+/);
  const keywords = keywordArray.map(k => k.toLowerCase());

  return inputWords.every(iWord =>
    keywords.some(kWord => kWord.startsWith(iWord))
  );
}
}
