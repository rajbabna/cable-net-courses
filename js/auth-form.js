// Auth form handler with tab switching and role-based redirect
const tabSignin = document.getElementById('tab-signin');
const tabSignup = document.getElementById('tab-signup');
const formSignin = document.getElementById('form-signin');
const formSignup = document.getElementById('form-signup');
const authMsg = document.getElementById('auth-msg');

// Tab switching
tabSignin.addEventListener('click', () => {
  tabSignin.classList.add('active');
  tabSignup.classList.remove('active');
  formSignin.style.display = 'block';
  formSignup.style.display = 'none';
  authMsg.classList.remove('show');
  authMsg.textContent = '';
});

tabSignup.addEventListener('click', () => {
  tabSignup.classList.add('active');
  tabSignin.classList.remove('active');
  formSignup.style.display = 'block';
  formSignin.style.display = 'none';
  authMsg.classList.remove('show');
  authMsg.textContent = '';
});

// Show message helper
function showMessage(text, type) {
  authMsg.textContent = text;
  authMsg.className = `msg show ${type}`;
}

// Handle login
formSignin.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('signin-email').value;
  const password = document.getElementById('signin-password').value;
  
  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    
    // Get user profile to check role and approval status
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('role, approved')
      .eq('id', data.user.id)
      .single();
    
    if (profileError) throw profileError;
    
    // Role-based redirect
    if (profile.role === 'admin') {
      window.location.href = 'instructor-dashboard.html';
    } else if (profile.role === 'student') {
      if (profile.approved) {
        window.location.href = 'student-dashboard.html';
      } else {
        window.location.href = 'pending.html';
      }
    }
  } catch (error) {
    showMessage(error.message, 'error');
  }
});

// Handle signup
formSignup.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const fullName = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  
  try {
    // Create auth user
    const { data: authData, error: authError } = await supabaseClient.auth.signUp({
      email,
      password,
    });
    
    if (authError) throw authError;
    
    // Create profile record with role='student' and approved=false
    const { error: profileError } = await supabaseClient
      .from('profiles')
      .insert([{
        id: authData.user.id,
        full_name: fullName,
        email,
        role: 'student',
        approved: false,
      }]);
    
    if (profileError) throw profileError;
    
    showMessage('Account created! Pending admin approval. Check your email to confirm.', 'success');
    
    // Clear form and redirect after delay
    formSignup.reset();
    setTimeout(() => {
      window.location.href = 'pending.html';
    }, 2000);
  } catch (error) {
    showMessage(error.message, 'error');
  }
});
