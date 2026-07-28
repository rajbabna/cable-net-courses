// Load and render courses dynamically
(async () => {
  const portsContainer = document.querySelector('.ports');
  
  try {
    // Fetch courses from database
    const { data: courses, error } = await supabaseClient
      .from('courses')
      .select('id, course_num, title, description, status')
      .order('course_num', { ascending: true });
    
    if (error) throw error;
    
    if (!courses || courses.length === 0) {
      portsContainer.innerHTML = '<p>No courses available at this time.</p>';
      return;
    }
    
    // Render each course as a port
    portsContainer.innerHTML = courses.map(course => `
      <div class="port">
        <span class="port-num">Port ${course.course_num}</span>
        <h3>${course.title}</h3>
        <p>${course.description}</p>
        <span class="status">${course.status || 'Available'}</span>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading courses:', error);
    portsContainer.innerHTML = '<p>Error loading courses. Please try again later.</p>';
  }
})();
