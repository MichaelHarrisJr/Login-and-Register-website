const authSwitchLinks = document.querySelectorAll('.switch');
const authModals = document.querySelectorAll('.auth .modal');
const authWrapper = document.querySelector('.auth');
const registerForm = document.querySelector('.register');
const loginForm = document.querySelector('.login');
const signOut = document.querySelector('.sign-out');
const loginIn = document.querySelectorAll('.login-in');
const loginOut = document.querySelectorAll('.signout');
const functions = firebase.functions();
const adminItems = document.querySelectorAll('.admin');
const accountDetails = document.querySelector('.account-details');

//add admin cloud function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const adminEmail = document.querySelector('#admin-email').value;
  const addAdminRole = functions.httpsCallable('addAdminRole');
  addAdminRole({ email: adminEmail}).then(result => {
    console.log(result);
  });
})

// toggle auth modals
authSwitchLinks.forEach(link => {
  link.addEventListener('click', () => {
    authModals.forEach(modal => modal.classList.toggle('active'));
  });
});

// register form
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = registerForm.email.value;
  const password = registerForm.password.value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((user) => {
    console.log('registered', user);
    registerForm.reset();
  })
  .catch((error) => {
    registerForm.querySelector('.error').textContent = error.message;
  });
});

// login form
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    console.log('logged in', user);
    loginForm.reset();
  })
  .catch((error) => {
    loginForm.querySelector('.error').textContent = error.message;
  });
});

//sign out
signOut.addEventListener('click', () => {
  firebase.auth().signOut()
  .then(() => console.log('signed out'));
})

const setupUI = (user) => {
  if (user) {
    if (user.admin) {
      adminItems.forEach(item => item.style.display = 'block');
    }
    // account info
    // toggle user UI elements
    loginIn.forEach(item => item.style.display = 'block');
    loginOut.forEach(item => item.style.display = 'block');
  } else {
    // clear account info
    
    // toggle user elements
    adminItems.forEach(item => item.style.display = 'none');
    loginIn.forEach(item => item.style.display = 'block');
    loginOut.forEach(item => item.style.display = 'block');
  }
};

//auth listener
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    user.getIdTokenResult().then(idTokenResult =>{
      user.admin = idTokenResult.claims.admin;
       setupUI(user);
    })
    authWrapper.classList.remove('open');
    authModals.forEach(modal => modal.classList.remove('active'));
  } else {
    authWrapper.classList.add('open');
    authModals[0].classList.add('active');
    setupUI();
  }
})