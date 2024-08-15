class UserProfile {
  constructor(username, email, birthdate, profilePicture = "", bio = "") {
    this.username = username;
    this.email = email;
    this.birthdate = new Date(birthdate);
    this.profilePicture = profilePicture;
    this.bio = bio;
    this.posts = [];
  }

  addPost(postContent) {
    const timestamp = new Date().toLocaleDateString();
    this.posts.push({ content: postContent, timestamp: timestamp });
  }

  updateEmail(newEmail) {
    this.email = newEmail;
  }
}

function saveUserProfile(user) {
  localStorage.setItem("userProfile", JSON.stringify(user));
}

function loadUserProfile() {
  const userProfileData = localStorage.getItem("userProfile");
  if (userProfileData) {
    const data = JSON.parse(userProfileData);
    const user = new UserProfile(
      data.username,
      data.email,
      data.birthdate,
      data.profilePicture,
      data.bio
    );
    user.posts = data.posts || {}; 
    return user;
  }
  return null;
}

function displayUserProfile(user) {
  document.getElementById("profileImage").src =
    user.profilePicture || " ";
  document.getElementById("displayUsername").innerText = user.username;
  document.getElementById("displayEmail").innerText = user.email;
  document.getElementById("displayBirthdate").innerText = new Date(user.birthdate).toLocaleDateString();
  document.getElementById("displayBio").innerText = user.bio;

  const postsList = document.getElementById("postsList");
  postsList.innerHTML = "";
  user.posts.forEach((post) => {
    const listItem = document.createElement("li");
    listItem.innerText = `${post.content} (Posted on: ${post.timestamp})`;
    postsList.appendChild(listItem);
  });

  document.getElementById("profileDisplay").classList.remove("hidden");
}




//here event listeners

document.addEventListener("DOMContentLoaded", function () {
  const user = loadUserProfile();
  if (user) {
    displayUserProfile(user);
  }

  document
    .getElementById("userProfileForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const birthdate = document.getElementById("birthdate").value;
      const profilePicture = document.getElementById("profilePicture").value;
      const bio = document.getElementById("bio").value;

      const user = new UserProfile(
        username,
        email,
        birthdate,
        profilePicture,
        bio
      );
      saveUserProfile(user);
      displayUserProfile(user);
    });

  document.getElementById("addPostButton").addEventListener("click", function () {
    const newPost = document.getElementById("newPost").value;
    const user = loadUserProfile();

    if (user && newPost) {
      user.addPost(newPost);
      saveUserProfile(user);
      displayUserProfile(user);
      document.getElementById("newPost").value = "";
    }
  });
});
