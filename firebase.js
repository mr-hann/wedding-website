  // Import the functions you need from the SDKs you need
  //import { initializeApp } from "firebase/app";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
// Add the Firestore import here:
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries


  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDDXk808adH9zsR9tQtWOWhomUa7uA4Zvw",
    authDomain: "wedding-2f8bc.firebaseapp.com",
    projectId: "wedding-2f8bc",
    storageBucket: "wedding-2f8bc.firebasestorage.app",
    messagingSenderId: "217726683522",
    appId: "1:217726683522:web:34316b9d449d81cca4a79b"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore (Correct way for v12)
const db = getFirestore(app);

// ========================================
// RSVP FORM - COLLECT AND WRITE TO FIREBASE
// ========================================

// Get form elements
const rsvpForm = document.getElementById('rsvpForm');
const attendanceSelect = document.getElementById('attendance');
const guestCountDiv = document.getElementById('guestCount');
const dietaryDiv = document.getElementById('dietaryRestrictions');
const rsvpSubmitBtn = document.getElementById('rsvpSubmitBtn');
const rsvpAlert = document.getElementById('rsvpAlert');





// Show/hide conditional fields based on attendance
attendanceSelect.addEventListener('change', function() {
    if (this.value === 'yes') {
        guestCountDiv.classList.remove('hidden');
        dietaryDiv.classList.remove('hidden');
    } else {
        guestCountDiv.classList.add('hidden');
        dietaryDiv.classList.add('hidden');
    }
});

// Handle form submission
rsvpForm.addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent default form submission
    
    // Disable submit button and show loading state
    rsvpSubmitBtn.disabled = true;
    rsvpSubmitBtn.innerHTML = '<div class="spinner"></div><span>Sending...</span>';
    
    // Collect form data
    const rsvpData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
       
        attendance: document.getElementById('attendance').value,
        guests: document.getElementById('attendance').value === 'yes' 
            ? document.getElementById('guests').value 
            : null,
        dietary: document.getElementById('attendance').value === 'yes' 
            ? document.getElementById('dietary').value.trim() 
            : null,
        message: document.getElementById('message').value.trim(),
          timestamp: serverTimestamp()
    };
    
    try {
      const docRef = await addDoc(collection(db, 'rsvps'), rsvpData);
      console.log('RSVP ID:', docRef.id);
        
        // Show success message
        showAlert('success', 'Thank you for your RSVP! We have received your response and are excited to celebrate with you.');
        
        // Reset form
        rsvpForm.reset();
        guestCountDiv.classList.add('hidden');
        dietaryDiv.classList.add('hidden');
        
    } catch (error) {
        // Handle errors
        console.error('Error submitting RSVP:', error);
        showAlert('error', 'Sorry, there was an error submitting your RSVP. Please try again or contact us directly.');
    } finally {
        // Re-enable submit button
        rsvpSubmitBtn.disabled = false;
        rsvpSubmitBtn.innerHTML = '<span>Send RSVP</span>';
    }
});

// ========================================
// HELPER FUNCTION - SHOW ALERT MESSAGES
// ========================================

function showAlert(type, message) {
    const alertElement = document.getElementById('rsvpAlert');
    
    // Set alert type and message
    alertElement.className = `alert alert-${type}`;
    alertElement.textContent = message;
    alertElement.classList.remove('hidden');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        alertElement.classList.add('hidden');
    }, 5000);
}

// ========================================
// ALTERNATIVE: SIMPLE VERSION (WITHOUT ERROR HANDLING)
// ========================================

/*
// Simpler version if you just want basic functionality
rsvpForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Collect data
    const rsvpData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        attendance: document.getElementById('attendance').value,
        guests: document.getElementById('guests').value,
        dietary: document.getElementById('dietary').value.trim(),
        message: document.getElementById('message').value.trim(),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    // Write to Firebase
    await db.collection('rsvps').add(rsvpData);
    
    alert('RSVP submitted successfully!');
    rsvpForm.reset();
});
*/

// ========================================
// BONUS: READ DATA FROM FIREBASE
// ========================================

// Function to read all RSVPs from database

// Get a reference to the container where messages will be displayed
// You need to have a div in your HTML with id="messages-container"
const messagesContainer = document.getElementById('messages-container');

if (messagesContainer) {
    // Create a query to retrieve documents from the 'messages' collection
    // and order them by 'timestamp' in descending order (newest first).
    const messagesQuery = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));

    // Set up a real-time listener using onSnapshot
    // This function will be called initially and every time the data in the query changes.
    onSnapshot(messagesQuery, (snapshot) => {
      

        snapshot.forEach((doc) => {
            const data = doc.data();
            // Extract data, providing fallback values for robustness
            const firstName = data.firstName || 'Anonymous';
            const lastName = data.lastName || '';
            const message = data.message || 'No message content.';
            const timestamp = data.timestamp; // Expecting a number (milliseconds since epoch)

            // Calculate "X days ago" from the timestamp
            let timeAgoText = '';
            if (timestamp) {
                const now = Date.now();
                const diffMs = now - timestamp;
                const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

                if (diffDays === 0) {
                    timeAgoText = 'Today';
                } else if (diffDays === 1) {
                    timeAgoText = '1 day ago';
                } else {
                    timeAgoText = `${diffDays} days ago`;
                }
            }

            // Generate initials for the avatar (e.g., "SJ" for Sarah Johnson)
            const initials = `${(firstName)[0] || ''}${(lastName)[0] || ''}`.toUpperCase();

            // Create the main card container div
            const cardDiv = document.createElement('div');
            cardDiv.className = 'w-80 md:w-96 flex-shrink-0';

            // Create the inner content div with shadow and styling
            const innerDiv = document.createElement('div');
            innerDiv.className = 'bg-white rounded-xl shadow-lg p-8 h-full hover:shadow-xl transition-shadow';

            // Create the header div for avatar, name, and date
            const headerDiv = document.createElement('div');
            headerDiv.className = 'flex items-center mb-4';

            // Create the avatar div
            const avatarDiv = document.createElement('div');
            avatarDiv.className = 'w-12 h-12 bg-wine rounded-full flex items-center justify-center text-white font-bold mr-4';
            avatarDiv.textContent = initials; // Set the initials

            // Create the div to hold the name and date
            const nameDateDiv = document.createElement('div');

            // Create h4 for the first and last name
            const nameH4 = document.createElement('h4');
            nameH4.className = 'font-semibold text-gray-800';
            nameH4.textContent = `${firstName} ${lastName}`;

            // Create p for the "X days ago" text
            const timeP = document.createElement('p');
            timeP.className = 'text-sm text-gray-500';
            timeP.textContent = timeAgoText;

            // Assemble the nameDateDiv
            nameDateDiv.appendChild(nameH4);
            nameDateDiv.appendChild(timeP);

            // Assemble the headerDiv
            headerDiv.appendChild(avatarDiv);
            headerDiv.appendChild(nameDateDiv);

            // Create p for the message content, wrapped in quotes
            const messageP = document.createElement('p');
            messageP.className = 'text-gray-600 leading-relaxed italic';
            messageP.textContent = `"${message}"`;

            // Assemble the innerDiv
            innerDiv.appendChild(headerDiv);
            innerDiv.appendChild(messageP);

            // Assemble the cardDiv
            cardDiv.appendChild(innerDiv);

            // Append the complete card to the messages container
            messagesContainer.appendChild(cardDiv);
        });
    });
} else {
    console.error('The HTML element with id="messages-container" was not found.');
}
// ========================================
// BONUS: UPDATE EXISTING RSVP
// ========================================

// Function to update an existing RSVP
async function updateRSVP(docId, updatedData) {
    try {
        await db.collection('rsvps').doc(docId).update(updatedData);
        console.log('RSVP updated successfully');
    } catch (error) {
        console.error('Error updating RSVP:', error);
    }
}


// ========================================
// BONUS: REAL-TIME LISTENER (LIVE UPDATES)
// ========================================

// Listen to real-time changes in the database
function listenToRSVPs() {
    db.collection('rsvps')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
            console.log('Real-time update received');
            
            snapshot.forEach((doc) => {
                console.log('RSVP:', doc.id, doc.data());
            });
            
            // You can update your UI here with the latest data
        }, (error) => {
            console.error('Error listening to RSVPs:', error);
        });
}

// Call this if you want live updates
// listenToRSVPs();