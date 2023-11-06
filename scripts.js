
// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBtSlPsIY9fARcgVzxhycUREeSCqR1vWB0",
    authDomain: "thesquabbledatabase.firebaseapp.com",
    projectId: "thesquabbledatabase",
    storageBucket: "thesquabbledatabase.appspot.com",
    messagingSenderId: "888902834587",
    appId: "1:888902834587:web:6ffb2d4a4d408ebcb6693e",
    measurementId: "G-9KS04RKC9E"
  };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
//init cloud firstore
//const db = getFirestore(app);

function login() {
    var user = document.getElementById("username-field").value;
    var password = document.getElementById("password-field").value;
    console.log("yo");
    // Sign in with Firebase Authentication
   
    // Sign in with Firebase Authentication
    auth.signInWithEmailAndPassword(user, password)
        .then((userCredential) => {
            // Signed in successfully
            const user = userCredential.user;
            // Check if the user is an admin in Firestore
            checkAdminStatus(user.uid);
        })
        .catch((error) => {
            // Handle errors here (e.g., invalid credentials)
            console.error(error.message);
        });

    console.log("user:" + user + password);
}

function checkAdminStatus(userId) {
    // Check if the user is an admin in Firestore
    const adminRef = db.collection('admins').doc(userId);
    adminRef.get()
        .then((doc) => {
            if (doc.exists) {
                // User is an admin, redirect to admin panel or perform admin actions
                console.log('User is an admin.');
                const adminContent = document.getElementById('admin-content');
                adminContent.style.display = 'block';


            } else {
                // User is not an admin, handle accordingly
                console.log('User is not an admin.');
                // Handle non-admin users (e.g., show an error message)
            }
        })
        .catch((error) => {
            // Handle errors here
            console.error(error.message);
        });
}





function displayText(inputBlog) {
    var paragraph = document.getElementById(inputBlog);
    paragraph.style.display = "block";
}


function displayPost(inputPost) {
    document.getElementById("blog1").innerHTML = inputPost;
}
        
function postToDatabase() {
    var blogTitle = document.getElementById("blog-title-field").value;
    var blogContent = document.getElementById("admin-textarea").value;

    db.collection("posts").add({
        name: blogTitle,
        content: blogContent,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}

function fetchBlogEntries() {
    const blogList = document.getElementById('blog-list');
    // Reference to the 'blogEntries' collection in Firestore (replace 'blogEntries' with your actual collection name)
    const blogEntriesRef = db.collection('posts');

    // Query the collection, order by timestamp in descending order
    blogEntriesRef.orderBy('timestamp', 'desc').get()
        .then((querySnapshot) => {
            // Clear existing entries in the list
            blogList.innerHTML = '';

            // Iterate through the documents and display blog entries
            querySnapshot.forEach((doc) => {
                const blogEntry = doc.data();
                const listItem = document.createElement('li');
                listItem.textContent = `${blogEntry.name}: ${blogEntry.content}`;
                blogList.appendChild(listItem);
            });
        })
        .catch((error) => {
            // Handle errors here
            console.error(error.message);
        });
}

function getRecentPost() {

    var posts = db.collection("posts");

    var query = posts.orderBy("timestamp", "desc").limit(1);

    //console.log(query.data());
       

    db.collection("posts").doc("jMQkmwq6q5okzyZqiNGM").get().then((doc) => {
    
  //db.collection("posts").get().then((doc) => {

        console.log(doc.data().content);
        console.log(doc.content);

        console.log(doc.data().name);

        // var datA = doc.data();

        var input = doc.data().content;

        if (doc.exists) {
            displayPost(String(input));
        }

    }).catch((error) => { console.log("Error getting document:", error); });

}


function yo() {
    const getUserGitHubAPI = async () => {
        const APIResponse = await fetch('https://api.github.com/users/n-mcnamara');
        const gitHubUser = await APIResponse.json();
        console.log(gitHubUser);
    }
    getUserGitHubAPI()
}