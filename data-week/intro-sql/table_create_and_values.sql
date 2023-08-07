CREATE TABLE `students` (
  `student_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `age` INT,
  `gender` VARCHAR(10),
  PRIMARY KEY (`student_id`)
);

DROP PROCEDURE IF EXISTS InsertRandomStudents;

CREATE PROCEDURE InsertRandomStudents()
BEGIN
    DECLARE i INT DEFAULT 1;
    WHILE i <= 100 DO
        INSERT INTO students (first_name, last_name, age, gender)
        VALUES
            (CONCAT('STUDENT ',i), CONCAT('LAST ',i), FLOOR(RAND()*10)+15, IF(RAND()>0.5, 'Male', 'Female'));
        SET i=i+1;
        END WHILE;
END;
CALL InsertRandomStudents();

CREATE TABLE `teachers` (
  `teacher_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `subject` VARCHAR(50),
  PRIMARY KEY (`teacher_id`)
);

DROP PROCEDURE IF EXISTS InsertMultipleTeachers;
CREATE PROCEDURE InsertMultipleTeachers()
BEGIN
    DECLARE i INT DEFAULT 1;
    DECLARE subjects VARCHAR(50);

    WHILE i <= 30 DO
        SET subjects = CASE FLOOR(RAND()*3)
            WHEN 0 THEN 'Mathematics'
            WHEN 1 THEN 'Science'
            WHEN 2 THEN 'Language'
            ELSE 'Other'
            END;
    INSERT INTO teachers(first_name,last_name, subject)
    VALUES (CONCAT('Teacher ',i), CONCAT('Teach Last N ',i), subjects);
        SET i=i+1;
    END WHILE;
END;
CALL InsertMultipleTeachers();

CREATE TABLE `grades` (
  `grade_id` INT NOT NULL AUTO_INCREMENT,
  `student_id` INT NOT NULL,
  `subject` VARCHAR(50) NOT NULL,
  `grade` DECIMAL(5, 2) NOT NULL,
  PRIMARY KEY (`grade_id`),
  FOREIGN KEY (`student_id`) REFERENCES `students`(`student_id`)
);

DROP PROCEDURE IF EXISTS InsertRandomGrades;

CREATE PROCEDURE InsertRandomGrades()
BEGIN
    DECLARE i INT DEFAULT 1;
    DECLARE student_id INT;
    DECLARE subject VARCHAR(50);
    DECLARE grade DECIMAL(5,2);

    WHILE i <= 300 DO
    SET student_id = FLOOR(RAND()*100)+1;
    SET subject = CASE FLOOR(RAND()*3)
            WHEN 0 THEN 'Mathematics'
            WHEN 1 THEN 'Science'
            WHEN 2 THEN 'Language'
            ELSE 'Other'
            END;
        SET grade = ROUND(RAND()*50 + 50,1);

        INSERT INTO grades(student_id, subject, grade)
        VALUES (student_id, subject, grade);
    SET i = i+1;
    END WHILE;
END;

CALL InsertRandomGrades();
