const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault();
  // Save the event so it can be triggered later
  deferredPrompt = event;
  // Update UI to notify the user they can add to home screen
  butInstall.style.display = 'block';
});

butInstall.addEventListener('click', async () => {
  // Hide the install button
  butInstall.style.display = 'none';
  // Show the install prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.userChoice;
  // Optionally, send analytics event with the outcome of the install prompt
  console.log(`User response to the install prompt: ${outcome}`);
  // Clear the saved prompt since it can't be used again
  deferredPrompt = null;
});

window.addEventListener('appinstalled', (event) => {
  // Clear the deferredPrompt so it can be garbage collected
  deferredPrompt = null;
  // Optionally, send analytics event to indicate successful installation
  console.log('PWA was installed');
  // Update the UI to indicate that the app can no longer be installed
  // (because it's already installed)
});

