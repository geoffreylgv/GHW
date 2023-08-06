DELETE FROM grades
WHERE grade_id=1;

SELECT * FROM grades
WHERE student_id=49 AND subject='Language';

-- Top performing students in each subject
SELECT s.first_name, s.last_name, g.subject, g.grade
FROM students s
JOIN grades g ON s.student_id=g.student_id
WHERE (g.subject, g.grade) IN(
    SELECT subject, MAX(grade)
    FROM grades
    GROUP BY subject
);

SELECT subject, AVG(grade) AS average_grade
FROM grades
GROUP BY subject;

SELECT s.first_name, s.last_name, AVG(g.grade) AS average_grade
FROM students s
JOIN grades g ON s.student_id = g.student_id
GROUP BY s.student_id, s.first_name, s.last_name
HAVING AVG(g.grade) > 90;

SELECT subject, AVG(grade) as avg_grade
FROM grades
GROUP BY subject
ORDER BY avg_grade DESC
LIMIT 1;

SELECT t.first_name, t.last_name, COUNT(g.subject) AS num_subjects_taught
FROM teachers t
LEFT JOIN grades g ON t.subject = g.subject
GROUP BY t.teacher_id, t.first_name, t.last_name
ORDER BY num_subjects_taught DESC
LIMIT 5;
