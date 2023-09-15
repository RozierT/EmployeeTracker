 SELECT departments.dept_name AS departments, reviews.review
 FROM 
 LEFT JOIN departments
 ON reviews.dept_id = dept.id
 ORDER BY departments.dept_name;